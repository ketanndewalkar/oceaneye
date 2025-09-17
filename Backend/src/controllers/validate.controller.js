import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import Report from "../models/reports.models.js";
import Verification from "../models/verification.models.js";
import moderatorVerification from "../models/moderator.models.js";


// 1. All pending Reports Status Update Official controller
export const validateReport = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { status, remark } = req.body;

  const validStatuses = ["approved", "rejected"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid status value");
  }

  if (!reportId || !status || !remark) {
    throw new ApiError(400, "All fields are required");
  }

  const userId = req.user._id;

  const report = await Report.findOne({ 
  _id: reportId, 
  moderatorApprovedCount: { $gte: 1 } 
});

  if (!report) {
    throw new ApiError(404, "No report found");
  }

  if (report.reportStatus === "approved") {
    throw new ApiError(400, "Report already verified");
  }

  const verifiedReport = await Verification.create({
    reportId,
    verifiedBy: userId,
    status,
    remark,
  });

  if (!verifiedReport) {
    throw new ApiError(
      500,
      "Error while updating verification status of report"
    );
  }

  report.reportVerificationStatus = status;
  await report.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        verifiedReport,
        "Updated verification status of report"
      )
    );
});

// 2. All pending Reports Status Update moderator controller

export const moderatorValidator = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  const { status, remark } = req.body;

  const role = req.user.role

  if(role !== "moderator"){
     throw new ApiError(400,"You do not have Permission ")
  }
  if (!reportId || !status || !remark) {
    throw new ApiError(400, "All fields are required");
  }


  const report = await Report.findById(reportId);
  if (!report) {
    throw new ApiError(404, "Invalid report Id");
  }

  report.moderatorVerificationStatus = status;

  if (status === "approved") {
    report.moderatorApprovedCount += 1;
  }

  const moderatorVerify = await moderatorVerification.create({
    reportId,
    verifiedBy: req.user._id,
    status,
    remark,
  });

  if (!moderatorVerify) {
    throw new ApiError(500, "Error while updating Status");
  }

  await report.save({ validateBeforeSave: false });

  return res.status(200).json(
    new ApiResponse(
      200,
      moderatorVerify,
      "Status Updated Successfully"
    )
  );
});
