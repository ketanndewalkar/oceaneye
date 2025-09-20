import { useEffect, useState } from "react";

const ReportCard = ({ report }) => {
  console.log(report);
  const [dateandtime, setdateandtime] = useState("");
  function extractDateTime(isoString) {
    const dateObj = new Date(isoString);

    // Extract date in YYYY-MM-DD
    const date = dateObj.toISOString().split("T")[0];

    // Extract time in H:MM:SS AM/PM (local time)
    const time = dateObj.toLocaleTimeString("en-US", {
      hour: "numeric", // no leading zero
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // AM/PM format
    });

    return { date, time };
  }
  useEffect(()=>{
    const ext = extractDateTime(report.images[0].uploadedAt);
    setdateandtime(`${ext.date}\t\t${ext.time}`)
  },[])
  return (
    <div className="relative flex flex-col bg-white shadow-md border border-slate-200 rounded-xl w-full hover:shadow-lg transition cursor-pointer hover:scale-103 duration-300">
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        <img
          src={report.images[0].url}
          alt={report.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-3 py-1 rounded-md shadow-md flex flex-col items-start">
          <span>Lat: {report.images[0].latitude}</span>
          <span>Lng: {report.images[0].longitude}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-slate-800">{report.title}</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          {report.description}
        </p>

        <div className="flex items-center text-slate-700 text-sm">
          <svg
            className="w-4 h-4 text-red-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          {report.images[0].location.city}
        </div>

        <div className="text-xs text-slate-400">{dateandtime}</div>
      </div>
    </div>
  );
};
export default ReportCard;
