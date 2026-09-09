import express from 'express'
import installRoute from '../routes/install.route.js'
import roomRoute from '../routes/room.route.js'
import ReservationRouter from '../routes/reservation.route.js'
const router = express.Router();

router.use(installRoute)
router.use(roomRoute)
router.use(ReservationRouter)
 export default router