import React, { useState, useRef, useEffect } from "react";
import styles from "./messages.module.css";
import { 
  messagesService, 
  getMessagesBetweenUsersService,
  sendMessageService
} from "../../../services/Messages.service.js";

function Messages() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = storedUser.id || storedUser.user_id;
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [conversations, setConversations] = useState([]);
  const [allMessages, setAllMessages] = useState({});
  const [showMobileChat, setShowMobileChat] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await messagesService();
        if (response && response.data) {
          setConversations(response.data);
          if (response.data.length > 0 && !selectedUser) {
            setSelectedUser(response.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchMessagesBetweenUsers = async () => {
      if (!selectedUser || !selectedUser.user_id) return;

      try {
        const receiverId = selectedUser.user_id;
        const response = await getMessagesBetweenUsersService(receiverId);

        if (response && response.data) {
          const list = Array.isArray(response.data) ? response.data : [response.data];
          setAllMessages((prev) => ({
            ...prev,
            [receiverId]: list,
          }));
        }
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchMessagesBetweenUsers();
  }, [selectedUser]);

  const currentMessages = selectedUser?.user_id
    ? allMessages[selectedUser.user_id] || []
    : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleSelectUser = (chat) => {
    setSelectedUser(chat);
    setShowMobileChat(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessageText.trim() || !selectedUser) return;

    const selectedId = selectedUser.user_id;
    const textToSend = newMessageText.trim();
    setNewMessageText("");

    try {
      const response = await sendMessageService(selectedId, textToSend);

      if (response && response.data) {
        const sentMsg = response.data;

        setAllMessages((prev) => ({
          ...prev,
          [selectedId]: [...(prev[selectedId] || []), sentMsg],
        }));

        setConversations((prevList) =>
          prevList.map((chat) => {
            if (chat.user_id === selectedId) {
              return {
                ...chat,
                last_message: textToSend,
                last_message_time: sentMsg.created_at || new Date().toISOString(),
              };
            }
            return chat;
          })
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const filteredConversations = conversations.filter((chat) =>
    chat.full_name?.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  return (
    <div className={styles["content-area"]}>
      <h3 className="fw-bold m-3 text-dark">Messages</h3>

      <div className="p-3 flex-grow-1 d-flex flex-direction-column">
        <div className={styles["chat-card"]}>
          <div className={styles["chat-row"]}>
            {/* SIDEBAR */}
            <div
              className={`col-12 col-md-4 ${styles["chat-sidebar"]} p-3 ${
                showMobileChat ? styles["hide-on-mobile"] : ""
              }`}
            >
              <div className="d-flex gap-2 mb-3">
                <input
                  type="text"
                  className={`form-control ${styles["search-box"]}`}
                  placeholder="Search name or chat..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                />
                <button className={`btn ${styles["filter-btn"]}`}>
                  <i className="bi bi-funnel-fill"></i>
                </button>
              </div>

              <div className={styles["chat-list"]}>
                {filteredConversations.length === 0 ? (
                  <div className="text-center p-3 text-muted">
                    No conversations found
                  </div>
                ) : (
                  filteredConversations.map((chat) => {
                    const isActive = selectedUser?.user_id === chat.user_id;
                    return (
                      <div
                        key={chat.user_id}
                        className={`${styles["chat-item"]} ${
                          isActive ? styles["active"] : ""
                        } d-flex align-items-center gap-2`}
                        onClick={() => handleSelectUser(chat)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={chat.avatar || "/default-avatar.png"}
                          className={styles["avatar"]}
                          alt={chat.full_name}
                        />
                        <div className="flex-grow-1 min-w-0">
                          <div className="d-flex justify-content-between">
                            <h6 className="mb-0 fw-bold text-truncate">
                              {chat.full_name}
                            </h6>
                            <small className="text-muted">
                              {formatTime(chat.last_message_time)}
                            </small>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-1">
                            <small className="text-muted text-truncate">
                              {chat.last_message}
                            </small>
                            {chat.unread_count > 0 && (
                              <span className={styles["badge-unread"]}>
                                {chat.unread_count}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* MAIN CHAT AREA */}
            <div
              className={`col-12 col-md-8 ${styles["chat-main"]} ${
                !showMobileChat ? styles["hide-on-mobile"] : ""
              }`}
            >
              {selectedUser ? (
                <>
                  {/* Header */}
                  <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-light d-md-none me-2"
                        onClick={() => setShowMobileChat(false)}
                      >
                        <i className="bi bi-arrow-left"></i>
                      </button>
                      <img
                        src={selectedUser.avatar || "/default-avatar.png"}
                        className={styles["avatar"]}
                        alt={selectedUser.full_name}
                      />
                      <div>
                        <h6 className="mb-0 fw-bold">
                          {selectedUser.full_name}
                        </h6>
                        <small className="text-muted">Active Now</small>
                      </div>
                    </div>
                    <i
                      className={`bi bi-three-dots fs-5 text-muted ${styles["cursor-pointer"]}`}
                    ></i>
                  </div>

                  {/* Messages Window */}
                  <div className={styles["chat-messages"]}>
                    {currentMessages.length === 0 ? (
                      <div className="text-center p-4 text-muted">
                        No messages yet. Say hello!
                      </div>
                    ) : (
                      currentMessages.map((msg, index) => {
                        const isOutgoing =
                          String(msg.sender_id) === String(currentUserId);

                        return isOutgoing ? (
                          <div
                            key={msg.id || index}
                            className={`${styles["message-row"]} ${styles["outgoing"]}`}
                          >
                            <div>
                              <div className={styles["bubble"]}>
                                {msg.message}
                              </div>
                              <div
                                className={`${styles["msg-time"]} text-end`}
                              >
                                {formatTime(msg.created_at)}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            key={msg.id || index}
                            className={`${styles["message-row"]} ${styles["incoming"]}`}
                          >
                            <img
                              src={selectedUser.avatar || "/default-avatar.png"}
                              className={styles["avatar"]}
                              style={{ width: "30px", height: "30px" }}
                              alt={selectedUser.full_name}
                            />
                            <div>
                              <div className={styles["bubble"]}>
                                {msg.message}
                              </div>
                              <div className={styles["msg-time"]}>
                                {formatTime(msg.created_at)}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Footer */}
                  <div className={styles["chat-footer"]}>
                    <form
                      onSubmit={handleSendMessage}
                      className="d-flex align-items-center gap-2"
                    >
                      <input
                        type="text"
                        className={`form-control ${styles["chat-input"]}`}
                        placeholder="Type a message..."
                        value={newMessageText}
                        onChange={(e) => setNewMessageText(e.target.value)}
                      />
                      <button
                        type="submit"
                        className={`btn ${styles["btn-send"]}`}
                        disabled={!newMessageText.trim()}
                      >
                        <i className="bi bi-send-fill"></i>
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                  <p>Select a conversation to start chatting</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;