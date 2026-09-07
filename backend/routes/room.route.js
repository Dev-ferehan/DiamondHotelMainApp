import express from 'express'
const roomRoute= express.Router();
import {addRoomController,getRoomsTypeController} from '../controllers/roomController.js'
roomRoute.post('/add-room',addRoomController)
roomRoute.get('/get-rooms-type',getRoomsTypeController)
export default roomRoute