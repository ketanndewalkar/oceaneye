import React, { useEffect, useState } from "react";

const ReportCardMod = ({ report }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("Pending");
  const [remark, setRemark] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { status, remark, reportId: report.id });
    setIsOpen(false); // Close modal after submit
  };
  useEffect(()=>{
    console.log(report)
  })
  return (
    <>
      {/* Card */}
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
          <h2 className="text-xl font-semibold text-slate-800">
            {report.title}
          </h2>
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
            {report.location}
          </div>

          <div className="text-xs text-slate-400">{report.images[0].uploadedAt}</div>

          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-3">
            {/* Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="w-full md:w-auto px-4 py-2 bg-[#00c9e4] text-white text-sm font-medium rounded-lg hover:bg-[#00b0c7] transition cursor-pointer"
            >
              Review Report
            </button>

            {/* Status Badge */}
            <span className="rounded-full flex items-center justify-center px-4 py-2 bg-[#ff2a00ce] border border-gray-300 text-white text-xs sm:text-sm font-medium">
              {report.moderatorVerificationStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b px-4 py-2">
              <h3 className="text-lg font-semibold">Review Report</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
              {/* Status Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Information">Information</option>
                </select>
              </div>

              {/* Remark */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remark
                </label>
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  rows="4"
                  placeholder="Enter your remark here..."
                  className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t pt-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-[#00c9e4] text-white rounded-md hover:bg-[#00bdd6] cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportCardMod;
