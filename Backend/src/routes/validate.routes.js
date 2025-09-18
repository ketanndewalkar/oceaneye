import express from "express";
import { isLoggedIn, validateValidatePermission } from "../middleware/auth.middleware.js";
import { moderatorValidator, validateReport } from "../controllers/validate.controller.js";

const router = express.Router();

router.post('/validate-report/:reportId',isLoggedIn,validateValidatePermission(['official']), validateReport)

router.post(
  "/moderator-validate-report/:reportId",
  isLoggedIn,
  moderatorValidator
);


export default router