import React from "react";
import { HiCamera } from "react-icons/hi";
import { TbSend } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
const Home2 = () => {
  return (
    <div className="w-screen h-dvh flex py-[17vw] flex-col justify-center items-center gap-[3vw] home2">
      <div className="flex flex-col justify-center items-center gap-[2vw] home21">
        <h1 className="text-[7vw] md:text-[3.5vw] font-bold text-gray-700">How It Works?</h1>
        <p className="text-[3vw] md:text-[1.5vw] text-gray-500 md:px-[20vw] px-[12vw] text-center">
          Our simple three-step process ensures rapid response and community
          safety through collaborative ocean monitoring.
        </p>
      </div>
      <div className="flex gap-[3vw] hero22 md:flex-row flex-col justify-center items-center home22">
        <div className="size-[22vw] border-1 border-gray-200 rounded-3xl shadow-2xl shadow-black/30 p-[2vw] transition-all duration-300 ease-linear hover:scale-105 cursor-pointer flex flex-col gap-[0.2vw] justify-between home221">
          <div className="h-[1/3] home2211">
            <div className="w-fit p-[0.6vw] rounded-2xl bg-[#389bcd3c] home22111">
              <HiCamera className="text-[2.8vw] text-[#389bcd] icons" />
            </div>
            <h1 className="text-[1.7vw] font-bold mt-[1vw] text-gray-700 ">
              Spot & Capture
            </h1>
          </div>

          <p className="text-[1.2vw] text-gray-600">
            Notice a hazard? Snap a photo and. pin the exact location with our
            GPS-enabled reporting system for instant documentation.
          </p>
        </div>
        <div className="size-[22vw] border-1 border-gray-200 rounded-3xl shadow-2xl shadow-black/30 p-[2vw] transition-all duration-300 ease-linear hover:scale-105 cursor-pointer flex flex-col gap-[0.2vw] justify-between home221">
          <div className="h-[1/3] home2211">
            <div className="w-fit p-[0.6vw] rounded-2xl bg-[#389bcd3c] home22111">
              <TbSend className="text-[2.8vw] text-[#389bcd] icons" />
            </div>
            <h1 className="text-[1.7vw] font-bold mt-[1vw] text-gray-700 ">
              Submit Report
            </h1>
          </div>
          <p className="text-[1.2vw] text-gray-600">
            Fill out our quick form with hazard details. Your report is
            instantly transmitted to local authorities and our community network
          </p>
        </div>
        <div className="size-[22vw] border-1 border-gray-200 rounded-3xl shadow-2xl shadow-black/30 p-[2vw] transition-all duration-300 ease-linear hover:scale-105 cursor-pointer flex flex-col gap-[0.2vw] justify-between home221">
          <div className="h-[1/3] home2211">
            <div className="w-fit p-[0.5vw] rounded-2xl bg-[#389bcd3c] home22111">
              <MdOutlineSecurity className="text-[3vw] text-[#389bcd] icons" />
            </div>
            <h1 className="text-[1.7vw] font-bold mt-[1vw] text-gray-700 ">
              Save Lives
            </h1>
          </div>
          <p className="text-[1.2vw] text-gray-600">
            Real-time alerts reach nearby users and emergency services, creating
            a protective network that prevents accidents and saves lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home2;
