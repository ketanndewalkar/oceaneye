import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";

import User from "../models/user.models.js"
import jwt from "jsonwebtoken"
import Report from "../models/reports.models.js";



export const isLoggedIn = asyncHandler(async(req,res,next) => {
    const token = req.cookies.AccessToken
    console.log("In auth middleware")
    if (!token){
        return res.status(404).json(
            new ApiResponse(404,null,"No token found")
        )
    }
    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
    const user = await User.findById(decodedToken._id).select("-password") 
    req.user = user
    next()
})
export const validateValidatePermission = (roles=[]) => asyncHandler(async(req,res,next) => {
    const {reportId} = req.params

    if(!reportId){
        throw new ApiError(400,"Report ID is required")
    }
    const report = await Report.findById({_id:reportId})

    if(!report){
        throw new ApiError(404,"Report not found")
    }

    const userRole = req.user.role
    if(roles.length && !roles.includes(userRole)){  
        throw new ApiError(403,"You do not have permission to access this report")
    }
    next()
})