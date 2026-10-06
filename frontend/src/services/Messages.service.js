export const messagesService = async () => {
  const savedToken = localStorage.getItem("token");

  if (!savedToken) {
    throw new Error("Authentication token not found");
  }

  try {
    const response = await fetch("http://localhost:8000/api/admin/messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch conversations: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("messagesService error:", error);
    throw error;
  }
};

export const getMessagesBetweenUsersService = async (receiverId) => {
  const savedToken = localStorage.getItem("token");

  if (!savedToken) {
    throw new Error("Authentication token not found");
  }

  try {
    const response = await fetch(`http://localhost:8000/api/admin/messages/${receiverId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getMessagesBetweenUsersService:", error);
    throw error;
  }
};

export const sendMessageService = async (receiverId, message) => {
  const savedToken = localStorage.getItem("token");

  if (!savedToken) {
    throw new Error("Authentication token not found");
  }

  try {
    const response = await fetch("http://localhost:8000/api/admin/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${savedToken}`,
      },
      body: JSON.stringify({ receiverId, message }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in sendMessageService:", error);
    throw error;
  }
};