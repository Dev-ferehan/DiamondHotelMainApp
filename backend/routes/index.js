import express from 'express'
import installRoute from '../routes/install.route.js'
import roomRoute from '../routes/room.route.js'
import ReservationRouter from '../routes/reservation.route.js'
import loginRoute from '../routes/login.route.js'
import messageRouter from '../routes/message.route.js'
import uploadRoutes from "../routes/uploadRoutes.js";
import registerRouter from "../routes/register.route.js";
const router = express.Router();
router.use(registerRouter);
router.use(uploadRoutes); 
router.use(loginRoute)
router.use(installRoute)
router.use(roomRoute)
router.use(ReservationRouter)
router.use(messageRouter)

 export default router