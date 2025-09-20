import React, { useEffect, useState } from "react";
import ReportCardMod from "../Components/ReportCardMod";
import axios from "axios";

const ModeratorDashboard = () => {
  const [reports, setReports] = useState([]);
  const getReports = async () =>{
    const res = await axios.get("http://localhost:4000/api/v1/reports/get-pending-reports",{
      withCredentials:true
    });
    setReports(res.data.data)
  }

  useEffect(()=>{
    getReports();
  },[])

  return (
    <>
      <div className="w-full h-fit py-[15vh] px-[5vw]">
        <div className="w-full relative flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 sm:pb-3">
          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Title</h1>

          {/* Underline container */}
          <div className="absolute bottom-0 left-0 flex w-full">
            <div className="bg-black h-1 w-3/4"></div>
            <div className="bg-[#0df] h-1 w-1/4"></div>
          </div>
        </div>

        <div className="pt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <ReportCardMod key={report._id} report={report} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ModeratorDashboard;
