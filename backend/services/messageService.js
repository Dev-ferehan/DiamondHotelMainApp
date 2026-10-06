import query from "../config/db.config.js";

export const getConversationsService = async (userId) => {
  const ChatQuery = `
    SELECT 
      u.id AS user_id,
      u.full_name,
      m.message AS last_message,
      m.created_at AS last_message_time,
      (SELECT COUNT(*) FROM messages WHERE sender_id = u.id AND receiver_id = ? AND is_read = 0) AS unread_count
    FROM users u
    JOIN messages m ON (m.id = (
        SELECT id FROM messages 
        WHERE (sender_id = u.id AND receiver_id = ?) 
           OR (sender_id = ? AND receiver_id = u.id)
        ORDER BY created_at DESC 
        LIMIT 1
    ))
    WHERE u.id != ?
    ORDER BY m.created_at DESC;
  `;
  const rows = await query(ChatQuery, [userId, userId, userId, userId]);
  return rows;
};

export const getMessagesBetweenUsersService = async (senderId, receiverId) => {
  const ChatQuery = `
    SELECT 
      m.id,
      m.sender_id,
      m.receiver_id,
      m.message,
      m.is_read,
      m.created_at
    FROM messages m
    WHERE (m.sender_id = ? AND m.receiver_id = ?) 
       OR (m.sender_id = ? AND m.receiver_id = ?)
    ORDER BY m.created_at ASC;
  `;
  
  const rows = await query(ChatQuery, [senderId, receiverId, receiverId, senderId]);

  await query(
    "UPDATE messages SET is_read = 1 WHERE sender_id = ? AND receiver_id = ?",
    [receiverId, senderId]
  );

  return rows;
};

export const sendMessageService = async (senderId, receiverId, message) => {
  const ChatQuery = `
    INSERT INTO messages (sender_id, receiver_id, message)
    VALUES (?, ?, ?);
  `;
  const result = await query(ChatQuery, [senderId, receiverId, message]);
  const insertId = result.insertId || result[0]?.insertId;

  return {
    id: insertId,
    sender_id: senderId,
    receiver_id: receiverId,
    message: message,
    created_at: new Date().toISOString()
  };
};