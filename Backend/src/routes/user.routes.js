import express from "express"
import {forgotPasswordRequest, getMe, logOut, login, register, verifyEmail} from "../controllers/user.controller.js"
import { isLoggedIn } from "../middleware/auth.middleware.js"




const router = express.Router()

 router.post('/register', register)
 router.post('/login',login)
 router.get('/me',isLoggedIn,getMe)
 router.get('/logout',isLoggedIn,logOut)
 router.get('/verify-email/:emailVerificationToken',verifyEmail)
 router.post('/forgot-password',isLoggedIn,forgotPasswordRequest)
//  router.post('/reset-password/:resetToken',isLoggedIn,resetPassword)

export default router