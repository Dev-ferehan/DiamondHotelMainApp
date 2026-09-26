import express from 'express'
import {registerController} from '../controllers/loginController.js'
const registerRouter = express.Router();
registerRouter.post('/register',registerController)
export default registerRouter
