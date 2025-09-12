import mongoose from "mongoose"



const ReportsSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    title : {
        type: String,
        trim: true
    },
    description: {
       type : String,
       required : true,
       trim: true
    },
    imageUrl : {
        type: String,
        required: true,
        trim:true,
    },
    latitude : {
       type: String,
       required:true,
    },
    longitude :{
        type: String,
        required:true
    },
    location : {
        type : String,
        required:true
    }
},{timestamps:true})

const Reports = mongoose.model("report",ReportsSchema)

export default Reports