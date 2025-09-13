import express from "express"
import {getMe, loggedOut, login, register} from "../controllers/user.controller.js"
import { isLoggedIn } from "../middleware/auth.middleware.js"




const router = express.Router()

 router.post("/register", register)
 router.post('/login',login)
 router.get('/me',isLoggedIn,getMe)
 router.get('/logout',isLoggedIn,loggedOut)


export default router