import authCtrl from '../controllers/authCtrl.js'
import express from "express";

const router = express.Router();

router.post('/register', authCtrl.register)

router.post('/login', authCtrl.login)

export default router