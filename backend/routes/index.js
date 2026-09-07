import express from 'express'
import installRoute from '../routes/install.route.js'
import roomRoute from '../routes/room.route.js'
const router = express.Router();

router.use(installRoute)
router.use(roomRoute)
 export default router