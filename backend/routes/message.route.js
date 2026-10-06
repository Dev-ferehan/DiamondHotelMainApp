import express from 'express';
import { authenticatedUser } from '../middleware/authentication.js';
import {
  getConversationsController, 
  getMessagesController,
  sendMessageController
} from '../controllers/messageController.js';

const messageRouter = express.Router();

messageRouter.get('/messages', authenticatedUser, getConversationsController);
messageRouter.get('/messages/:receiverId', authenticatedUser, getMessagesController);
messageRouter.post('/messages', authenticatedUser, sendMessageController);

export default messageRouter;