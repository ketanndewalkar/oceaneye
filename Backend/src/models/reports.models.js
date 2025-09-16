import mongoose from "mongoose";


const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    location: {
      type: Object,
    },
    exif: {
      make: String,     
      model: String,    
      dateTaken: Date,  
      gpsLatitude: Number,  
      gpsLongitude: Number, 
    },
    
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const reportSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    moderatorVerificationStatus : {
      type: String,
      enum : ["pending","approved","rejected","Information"],
      default : "pending"
    },
    moderatorApprovedCount : {
      type:Number,
      default:0
    },
    reportVerificationStatus:{
      type:String,
      enum: ["pending","approved","rejected"],
      default: "pending"
    },
    userEnteredLocation:{
      type:String,
      
    },
    images: [imageSchema],
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
