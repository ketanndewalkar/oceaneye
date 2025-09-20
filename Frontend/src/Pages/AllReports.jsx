import React from "react";
import ReportCard from "../Components/ReportCard";
const reports = [
  {
    id: 1,
    title: "Illegal Dumping Near River",
    description:
      "Piles of waste materials were found dumped illegally near the river bank, posing environmental hazards.",
    location: "Pune, India",
    latitude: "18.5204° N",
    longitude: "73.8567° E",
    createdAt: "Sep 19, 2025 - 10:30 AM",
    image:
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "Broken Streetlight",
    description:
      "A broken streetlight has left the area dark during night hours, causing safety concerns for pedestrians.",
    location: "Mumbai, India",
    latitude: "19.0760° N",
    longitude: "72.8777° E",
    createdAt: "Sep 18, 2025 - 08:15 PM",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Road Pothole Issue",
    description:
      "Large potholes on the main road are causing difficulties for vehicles and increasing the risk of accidents.",
    location: "Nagpur, India",
    latitude: "21.1458° N",
    longitude: "79.0882° E",
    createdAt: "Sep 17, 2025 - 03:45 PM",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1470&q=80",
  },
];

const AllReports = () => {
  return (
    <>
      <div className="w-full h-fit py-[15vh] px-[5vw]">
        <div className="w-full h-fit relative flex justify-between items-center pb-[0.7vw]">
          <h1 className="text-[2vw] font-bold">Title</h1>
          <span className="border-1 rounded-full flex items-center justify-center px-[1vw] h-[70%] bg-[#0f9] border-gray-300 text-gray-700 text-[1vw] font-medium"><p>Verified Reports</p></span>
          <div className="w-3/4 bg-[#000] absolute bottom-0 left-0 h-1"></div>
          <div className="w-1/4 bg-[#0df] absolute bottom-0 right-0 h-1"></div>
        </div>
        <div className="pt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllReports;
