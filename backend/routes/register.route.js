import express from 'express'
import {registerController} from '../controllers/loginController.js'
import { authenticatedUser } from '../middleware/authentication.js';
const registerRouter = express.Router();
registerRouter.post('/register',authenticatedUser,registerController)
export default registerRouter
