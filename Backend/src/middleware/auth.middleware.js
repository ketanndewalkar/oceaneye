import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

import User from "../models/user.models.js"
import jwt from "jsonwebtoken"



export const isLoggedIn = asyncHandler(async(req,res,next) => {
    const token = req.cookies.AccessToken
    
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