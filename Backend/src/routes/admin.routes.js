import express from "express"
import { isLoggedIn } from "../middleware/auth.middleware.js"
import { changeRole } from "../controllers/admin.controller.js"

const router = express.Router()

router.post('/update-role',isLoggedIn,changeRole)

export default router