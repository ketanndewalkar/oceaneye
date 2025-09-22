import React, { useEffect, useState } from "react";
import ReportCard from "../Components/ReportCard";
import axios from "axios";

const AllReports = () => {
  const [reports,setreports] = useState([]);
  const getReports = async () =>{
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/reports/get-approved-reports`,
      { withCredentials: true }
    );
    console.log(res.data.data)
    setreports(res.data.data);
  }
  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <div className="w-full h-fit py-[15vh] px-[5vw]">
        <div className="w-full h-fit relative flex justify-between items-center pb-[0.7vw]">
          <h1 className="text-[2vw] font-bold">Title</h1>
          <span className="border-1 rounded-full flex items-center justify-center px-[1vw] h-[70%] bg-[#0f9] border-gray-300 text-gray-700 text-[1vw] font-medium">
            <p>Verified Reports</p>
          </span>
          <div className="w-3/4 bg-[#000] absolute bottom-0 left-0 h-1"></div>
          <div className="w-1/4 bg-[#0df] absolute bottom-0 right-0 h-1"></div>
        </div>
        <div className="pt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllReports;
