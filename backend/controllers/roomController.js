import { addRoomService, checkRoomExit, getRoomsType } from "../services/roomService.js";

export const addRoomController = async (req, res) => {
  // check if the request body is not empty
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