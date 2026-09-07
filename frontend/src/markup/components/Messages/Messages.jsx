import React from "react";
import styles from "./messages.module.css";

function Messages() {
  return (
    <div>
      <div className={styles["content-area"]}>
        <nav className="navbar top-navbar px-3 justify-content-between">
          <div></div>
          <div className="d-flex align-items-center gap-2">
            <input
              className="form-control form-control-sm border-0 bg-secondary text-white"
              type="search"
              placeholder="Search for..."
            />
            <button className="btn btn-primary btn-sm">
              <i className="bi bi-search"></i>
            </button>
            <i className="bi bi-person-circle text-white fs-5 ms-3"></i>
          </div>
        </nav>

        <div className="p-3">
          <h3 className="fw-bold mb-3 text-dark">Messages</h3>

          <div className={styles["chat-card"]}>
            <div className="row g-0 h-100">
              <div className={`col-md-4 ${styles["chat-sidebar"]} p-3`}>
                <div className="d-flex gap-2 mb-3">
                  <input
                    type="text"
                    className={`form-control ${styles["search-box"]}`}
                    placeholder="Search name, chat, etc"
                  />
                  <button className={`btn ${styles["filter-btn"]}`}>
                    <i className="bi bi-funnel"></i>
                  </button>
                </div>

                <div className={styles["chat-list"]}>
                  <div className={`${styles["chat-item"]} ${styles["active"]} d-flex align-items-center gap-2`}>
                    <img
                      src="https://i.pravatar.cc/100?img=47"
                      className={styles["avatar"]}
                      alt="Alice"
                    />
                    <div className="flex-grow-1 min-w-0">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0 fw-bold text-truncate">
                          Alice Johnson
                        </h6>
                        <small className="text-muted">09:15 AM</small>
                      </div>
                      <small className="text-muted text-truncate d-block">
                        Can I request a late check-out for Room 305?
                      </small>
                    </div>
                  </div>

                  <div className={`${styles["chat-item"]} d-flex align-items-center gap-2`}>
                    <img
                      src="https://i.pravatar.cc/100?img=12"
                      className={styles["avatar"]}
                      alt="Michael"
                    />
                    <div className="flex-grow-1 min-w-0">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0 fw-bold text-truncate">
                          Michael Brown
                        </h6>
                        <small className="text-muted">09:30 AM</small>
                      </div>
                      <div className="d-flex justify-content-between">
                        <small className="text-muted text-truncate">
                          The AC in my room isn't working...
                        </small>
                        <span className={styles["badge-unread"]}>1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`col-md-8 ${styles["chat-main"]}`}>
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src="https://i.pravatar.cc/100?img=47"
                      className={styles["avatar"]}
                      alt="Alice"
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">Alice Johnson</h6>
                      <small className="text-muted">last seen recently</small>
                    </div>
                  </div>
                  <i className={`bi bi-three-dots fs-5 text-muted ${styles["cursor-pointer"]}`}></i>
                </div>

                <div className={styles["chat-messages"]}>
                  <div className={`${styles["message-row"]} ${styles["incoming"]}`}>
                    <img
                      src="https://i.pravatar.cc/100?img=47"
                      className={styles["avatar"]}
                      style={{ width: "28px", height: "28px" }}
                      alt="Alice"
                    />
                    <div>
                      <div className={styles["bubble"]}>
                        Can I request a late check-out for Room 305?
                      </div>
                      <div className={styles["msg-time"]}>9:15 AM</div>
                    </div>
                  </div>

                  <div className={`${styles["message-row"]} ${styles["outgoing"]}`}>
                    <div>
                      <div className={styles["bubble"]}>
                        Hi Alice, we can accommodate a late check-out for you.
                        How late would you like to stay?
                      </div>
                      <div className={`${styles["msg-time"]} text-end`}>9:20 AM</div>
                    </div>
                  </div>
                </div>

                <div className={styles["chat-footer"]}>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="text"
                      className={`form-control ${styles["chat-input"]}`}
                      placeholder="Type a message..."
                    />
                    <button className={`btn ${styles["btn-send"]} px-3`}>
                      <i className="bi bi-send-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;