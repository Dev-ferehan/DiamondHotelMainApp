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

  export const getRoomTypeService=async()=>{
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8000/api/admin/get-rooms-type",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",           
            "Authorization": `Bearer ${token}`
          },
      
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to get room "
        );
      }
  
      return data;
  
    } catch (error) {
      console.error(
        "get room error:",
        error
      );
  
      throw error;
    }
  }




  
  import axios from "axios";

export const editRoomService = async (roomId, roomData) => {
  try {
    const token = localStorage.getItem("token"); 

    const response = await axios.put(
      
      `http://localhost:8000/api/admin/edit-room/${roomId}`,
      roomData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error("Failed to update room");
  }
};