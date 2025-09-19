import Hotspot from "../models/hotspot.models.js";


const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}




export const updateHotspotForReport = async (report) => {
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

  if (!latitude || !longitude) return;

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
};
