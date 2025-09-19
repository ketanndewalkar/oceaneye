import express from "express"
import { getHotspots } from "../controllers/hotspots.controller.js"
import { isLoggedIn } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get('/',isLoggedIn,getHotspots)

export default router