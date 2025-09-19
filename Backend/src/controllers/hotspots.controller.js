import Hotspot from "../models/hotspot.models.js"
import Report from "../models/reports.models.js"

export const updateHotspots = async () => {
  const approvedReports = await Report.find({
    reportVerificationStatus: "approved",
  });

  for (const report of approvedReports) {
    let latitude = null;
    let longitude = null;

    if (report.images.length > 0) {
      latitude = report.images[0].latitude;
      longitude = report.images[0].longitude;
    }

    if ((!latitude || !longitude) && report.userEnteredLocation) {
      const [lat, lng] = report.userEnteredLocation.split(",").map(Number);
      latitude = lat;
      longitude = lng;
    }

    if (!latitude || !longitude) continue;

    let hotspot = await Hotspot.findOne({ latitude, longitude });

    if (hotspot) {
      if (!hotspot.reports.includes(report._id)) {
        hotspot.reports.push(report._id);
        hotspot.reportCount += 1;
        await hotspot.save();
      }
    } else {
      const newHotspot = new Hotspot({
        title: `Hotspot near ${report.title}`,
        latitude,
        longitude,
        reports: [report._id],
        reportCount: 1,
      });
      await newHotspot.save();
    }
  }
};


export const getHotspots = async (req, res) => {
  try {
    const hotspots = await Hotspot.find()
      .select("title latitude longitude reportCount")
      .lean();

    return res.status(200).json({
      success: true,
      data: hotspots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching hotspots",
      error: error.message,
    });
  }
};