import express from "express"
import {login, register} from "../controllers/user.controller.js"
// import { registerUser,login,getMe } from "../controllers/user.controller.js"



const router = express.Router()

 router.post("/register", register)
 router.post('/login',login)
// router.get('/me',isLoggedIn,getMe)


export default router