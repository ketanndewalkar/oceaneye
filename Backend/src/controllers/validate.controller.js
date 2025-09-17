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
  const {reportId} = req.params

  const {status,remark} = req.body

  if(!status || !remark){
    throw new ApiError(400,"All Fields are required")
  }

  if(!reportId){
    throw new ApiError(400,"No id Provided")
  }
 const report = await Report.findById(reportId);

if (!report) {
  throw new ApiError(404, "Invalid report Id");
}

// 1️⃣ Push action into the array inside report
report.moderatorVerifications.push({
  verifiedBy: req.user._id,
  status,
  remark,
  createdAt: new Date()
});

// 2️⃣ Compute counts
const approvedCount = report.moderatorVerifications.filter(v => v.status === 'approved').length;
const rejectedCount = report.moderatorVerifications.filter(v => v.status === 'rejected').length;

// 3️⃣ Update summary fields
if (approvedCount >= 1) report.moderatorVerificationStatus = 'approved';
else if (rejectedCount === report.moderatorVerifications.length) report.moderatorVerificationStatus = 'rejected';
else report.moderatorVerificationStatus = 'pending';

report.moderatorApprovedCount = approvedCount;

// 4️⃣ Create separate moderatorVerification record (for history)
const moderatorVerify = await moderatorVerification.create({
  reportId,
  verifiedBy: req.user._id,
  status,
  remark,
});

if (!moderatorVerify) {
  throw new ApiError(500, "Error while updating Status");
}

// 5️⃣ Save the report
await report.save({ validateBeforeSave: false });

return res.status(200).json(
  new ApiResponse(200, moderatorVerify, "Status Updated Successfully")
);
})
