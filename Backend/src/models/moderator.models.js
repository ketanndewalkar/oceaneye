import mongoose from "mongoose";

const moderatorVerificationSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["approved", "rejected"],
      required : true
    },
    remark: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const moderatorVerification = mongoose.model("moderatorVerification", moderatorVerificationSchema);

export default moderatorVerification;
