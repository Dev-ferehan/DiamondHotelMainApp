import { addRoomService, checkRoomExit, getRoomsType, editRoomService } from "../services/roomService.js";

export const addRoomController = async (req, res) => {
  const RoomExit = await checkRoomExit(req.body.room_number);
  if (RoomExit.status == 200) {
    res.status(200).json({
      message: RoomExit.message,
    });
  } else {
    console.log("add room message controller 0000",req.body)
    const addRoomMessage = await addRoomService(req.body);
    console.log("add room message controller 0000",addRoomMessage.error,addRoomMessage.status)
    if (addRoomMessage.status == 200) {
      res.status(200).json({
        message: addRoomMessage.message,
      });
    } else {
      res.status(500).json({
        message: addRoomMessage.message,
      });
    }
  }
};


export const getRoomsTypeController = async (req,res) => {
  const roomsType = await getRoomsType();
  // console.log("rooms type controller",roomsType.rooms)
  if (roomsType.status == 200) {
    res.status(200).json({
      message: roomsType.message,
      rooms: roomsType.rooms,
    });
  } else {
    res.status(500).json({
      message: roomsType.message,
      rooms: roomsType.rooms,
    });
  }
 
};



export const editRoomsController=async(req,res)=>{
    try {
      const { id } = req.params; 
      const roomData = req.body;
console.log("hhhhhh",id,"data:::::::::::::::",roomData)
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Room ID is required'
        });
      }

      const result = await editRoomService.updateRoom(id, roomData);

      return res.status(200).json({
        success: true,
        message: 'Room updated successfully',
        data: result
      });
    } catch (error) {
      console.error('Error in updateRoom controller:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error while updating room',
        error: error.message
      });
    }
  }



