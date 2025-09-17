import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema(
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

const Verification = mongoose.model("Verification", verificationSchema);

export default Verification;
