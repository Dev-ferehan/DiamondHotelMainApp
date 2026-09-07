import express from 'express'
const installRoute= express.Router();
import installController from '../controllers/installController.js'
console.log("kiosalki from router ")

installRoute.get('/install',installController)

export default installRoute