import express from "express"
import { isLoggedIn } from "../middleware/auth.middleware.js"
import { upload } from "../utils/cloudinary.js"
import { UploadReport } from "../controllers/reports.controller.js"

const Router = express.Router()


Router.post("/upload-report", isLoggedIn,upload(true, "image"), UploadReport);


export default Router