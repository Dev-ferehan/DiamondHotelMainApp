export const addRoomService = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/api/admin/add-room",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",           
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add room"
        );
      }
  
      return data;
  
    } catch (error) {
      console.error(
        "Add room error:",
        error
      );
  
      throw error;
    }
  };

