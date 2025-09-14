import express from "express";
import { isLoggedIn, validateValidatePermission } from "../middleware/auth.middleware.js";
import { validateReport } from "../controllers/validate.controller.js";

const router = express.Router();

router.post('/validate-report/:reportId',isLoggedIn,validateValidatePermission(['official']), validateReport)


export default router