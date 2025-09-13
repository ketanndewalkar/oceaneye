import express from "express"
import { isLoggedIn } from "../middleware/auth.middleware.js"
import { upload } from "../utils/cloudinary.js"
import { getAllReports, getReportById, uploadReport } from "../controllers/reports.controller.js"

const router = express.Router()


router.post("/upload-report", isLoggedIn,upload(true, "image"), uploadReport);

router.get('/get-reports',isLoggedIn,getAllReports)

router.get('/get-report/:reportId',isLoggedIn,getReportById)


export default router