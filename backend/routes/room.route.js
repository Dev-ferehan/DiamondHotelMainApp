import express from 'express'
const roomRoute= express.Router();
import {addRoomController,getRoomsTypeController,editRoomsController} from '../controllers/roomController.js'
import {authenticatedUser} from '../middleware/authentication.js'

roomRoute.post('/add-room',authenticatedUser,addRoomController)
roomRoute.get('/get-rooms-type',authenticatedUser ,getRoomsTypeController)
roomRoute.put('/edit-room/:roomId',authenticatedUser,editRoomsController)
export default roomRoute