import {
  getConversationsService,
  getMessagesBetweenUsersService,
  sendMessageService
} from "../services/messageService.js";

export const getConversationsController = async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const conversations = await getConversationsService(currentUserId);
    return res.status(200).json({ success: true, data: conversations });
  } catch (error) {
    console.error("Error in getConversationsController:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    const { receiverId } = req.params;

    if (!currentUserId || !receiverId) {
      return res.status(400).json({ success: false, message: "Sender and Receiver IDs required" });
    }

    const messages = await getMessagesBetweenUsersService(currentUserId, receiverId);
    return res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error("Error in getMessagesController:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const sendMessageController = async (req, res) => {
  try {
    const senderId = req.user?.id;
    const { receiverId, message } = req.body;

    if (!senderId || !receiverId || !message || !message.trim()) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newMessage = await sendMessageService(senderId, receiverId, message.trim());
    return res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Error in sendMessageController:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};