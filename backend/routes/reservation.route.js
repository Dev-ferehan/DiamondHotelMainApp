import express from 'express'
import {addGuestController,getGuestController} from '../controllers/reservationController.js'
import {authenticatedUser} from '../middleware/authentication.js'
const ReservationRouter = express.Router();
ReservationRouter.post('/reservation/add-guest',authenticatedUser,addGuestController)
ReservationRouter.get('/reservation/get-guest-info',authenticatedUser,getGuestController)

export default ReservationRouter