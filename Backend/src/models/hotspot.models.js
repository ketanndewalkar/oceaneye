import mongoose from "mongoose";

const hotspotSchema = new mongoose.Schema(
  {
    title: {
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
    reportCount: {
      type: Number,
      default: 0,
    },
    reports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
      },
    ],
  },
  { timestamps: true }
);

const Hotspot = mongoose.model("Hotspot", hotspotSchema);

export default Hotspot;
