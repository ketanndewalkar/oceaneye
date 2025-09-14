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
      type: String,
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
    reportStatus:{
      type:String,
      enum: ["pending","approved","rejected"],
      default: "pending"
    },
    images: [imageSchema],
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
