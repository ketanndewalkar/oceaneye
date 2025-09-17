import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import Report from "../models/reports.models.js";
import { exiftool } from "exiftool-vendored";
import axios from "axios";

export const uploadReport = asyncHandler(async (req, res) => {
  try {
    const { title, description, userEnteredLocation, latitude, longitude } =
      req.body;

    if (!title || !description || !latitude || !longitude) {
      throw new ApiError(401, "All fields are required");
    }

    

    if (!req.file) {
      throw new ApiError(404, "No Image found");
    }

    const imageUrl = req.file.path;
    const userId = req.user._id;
    console.log(imageUrl);
    console.log(userId);

    const BrowserLatitude = latitude;
    const BrowserLongitude = longitude;

    const response = await axios.get(
      `https://us1.locationiq.com/v1/reverse?key=${process.env.LOCATION_API_KEY}&lat=28.6139&&lon=77.2090&&format=json`
    );

    const location = response.data.address;

    let exifData = {};
    let gpsLatitude, gpsLongitude;

    try {
      const metadata = await exiftool.read(req.file.path);

      if (metadata.GPSLatitude && metadata.GPSLongitude) {
        gpsLatitude = metadata.GPSLatitude;
        gpsLongitude = metadata.GPSLongitude;
      }

      exifData = {
        make: metadata.Make || null,
        model: metadata.Model || null,
        dateTaken: metadata.DateTimeOriginal || null,
        gpsLatitude: gpsLatitude || null,
        gpsLongitude: gpsLongitude || null,
      };
    } catch (err) {
      console.error(
        "No EXIF data found, falling back to browser location",
        err
      );
    }

    const report = await Report.create({
      uploadedBy: userId,
      title,
      description,
      images: [
        {
          url: imageUrl,
          latitude: BrowserLatitude,
          longitude: BrowserLongitude,
          location,
          userEnteredLocation,
          exif: exifData,
        },
      ],
    });

    if (!report) {
      throw new ApiError(500, "Internal Server Error");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, report, "Report uploaded successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Something went wrong");
  }
});

export const getAllReports = asyncHandler(async (req, res) => {
  const reports = await Report.find();
  if (reports.length === 0) {
    throw new ApiError(404, "No report found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, reports, "All reports fetched succesfully"));
});

export const getReportById = asyncHandler(async (req, res) => {
  const { reportId } = req.params;
  if (!reportId) {
    throw new ApiError(401, "reportId is required");
  }
  const report = await Report.findById({ _id: reportId });

  if (!report) {
    throw new ApiError(404, "No report found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, report, "Report for id fetched"));
});

// Need to design controller
// 1. All pending Reports for moderator controller
// 1. All pending Reports Status Update moderator controller
// 2. All pending Reports Status Update official controller
// 2. All pending Reports for moderator controller

export const PendingReports = asyncHandler(async (req, res) => {
  // This controller is for all pending reports needs to be reviewed by moderators
  const reports = await Report.find({ moderatorVerificationStatus: "pending" }).populate("uploadedBy");

 

  if (reports.length === 0) {
    throw new ApiError(404, "No reports found");
  }

  return res.status(200).json(
    new ApiResponse(200,reports,"All Pending Reports Fetched..")
  )

});

export const officialReviewPending = asyncHandler(async(req,res) => {
  const reports = await Report.find({
    moderatorApprovedCount : {$gte: 1},
    officialVerificationStatus: { $ne: "approved" }
  })
  if(!reports){
    throw new ApiError(404,"No Report found")
  }

  return res.status(200).json(
    new ApiResponse(200,reports,"All pending Reports Fetched Succesfully")
  )
})

// Approved Reports Controller 

export const getApprovedReports = asyncHandler(async(req,res) => {
   const reports = await Report.find({
    reportVerificationStatus:"approved"
   })

   if(!reports){
    throw new ApiError(404,"No reports found")
   }

   return res.status(200).json(
    new ApiResponse(200,reports,"All reports fetched succesfully")
   )

})
