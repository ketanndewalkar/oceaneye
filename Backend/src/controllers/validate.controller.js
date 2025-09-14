import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import Report from "../models/reports.models.js";
import Verification from "../models/verification.models.js";

export const validateReport = asyncHandler(async (req,res) => {
    const {reportId} = req.params
    const {status,remark} = req.body

    if(!reportId || !status || !remark){
        throw new ApiError(400,"All fields are required")
    }

    const userId = req.user._id

    const report = await Report.findById({_id:reportId})

    if(!report){
        throw new ApiError(404,"All fields are required")
    }

    if(report.reportStatus === "approved"){
        throw new ApiError(400,"Report already verified")
    }

    const verifiedReport = await Verification.create({
        reportId,
        verifiedBy: userId,
        status,
        remark
    })

    if(!verifiedReport){
        throw new ApiError(500,"Error while updating verification status of report")
    }
    
    report.reportStatus = status
    await report.save({validateBeforeSave:false})

    return res.status(200).json(
        new ApiResponse(200,verifiedReport,"Updated verification status of report")
    )
})