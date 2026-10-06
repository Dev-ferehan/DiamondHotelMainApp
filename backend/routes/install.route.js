import express from 'express'
const installRoute= express.Router();
import installController from '../controllers/installController.js'
import { authenticatedUser } from '../middleware/authentication.js';

installRoute.get('/install',authenticatedUser,installController)

export default installRoute