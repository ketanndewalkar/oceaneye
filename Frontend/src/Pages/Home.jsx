import React from "react";
import { IoIosWarning } from "react-icons/io";
import { VscRadioTower } from "react-icons/vsc";
const Home = () => {
  return (
    <div className="w-full h-dvh relative z-95 home">
      <img
        src="/assets/ocean.jpg"
        className="size-full absolute top-0 left-0 z-96"
      />
      <div className="pt-[15vh] size-full z-96 relative flex justify-center items-center flex-col home1">
        <div className="text-[5vw] h-[45%] font-semibold w-full flex flex-col items-center home11">
          <h1 className="text-gray-100">Be The First To Report &</h1>
          <h1 className="text-[#389bcd]">Help Save Lives</h1>
        </div>
        <p className="text-gray-200 text-[1.4vw] px-[20vw] text-center font-semibold home12">
          Join thousands of ocean guardians protecting our waters. Report
          hazards instantly and help save lives with real-time ocean safety
          alerts.
        </p>
        <div className="flex gap-[3vw] mt-[3vw] home13">
          <button className="py-[0.8vw] px-[3vw] bg-[#389bcda2] flex items-center gap-[1vw] font-semibold rounded-lg text-[#ffffffd0] hover:scale-97 transition-all duration-300 ease-linear cursor-pointer">
            <IoIosWarning className="text-[2vw] i" />
            Report Incident
          </button>
          <button className="border-2 rounded-lg py-[0.8vw] px-[3vw] flex items-center gap-[1vw] font-semibold text-[#ffffffd0]  hover:scale-97 transition-all duration-300 ease-linear cursor-pointer">
            <VscRadioTower className="text-[2vw] i" />
            View Live Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
