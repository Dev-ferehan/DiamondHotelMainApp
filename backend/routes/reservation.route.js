import express from 'express'
import {addGuestController,getGuestController} from '../controllers/reservationController.js'
const ReservationRouter = express.Router();
ReservationRouter.post('/reservation/add-guest',addGuestController)
ReservationRouter.get('/reservation/get-guest-info',getGuestController)

export default ReservationRouter