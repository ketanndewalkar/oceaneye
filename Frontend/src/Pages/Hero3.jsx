import React from "react";
import { MapPin } from "lucide-react";

const ReportCard = ({ image, status, time, title, description, reporterImg, reporterName, location }) => {
  return (
    <div className="size-[22vw] rounded-lg border border-gray-200 overflow-hidden shadow-2xl shadow-black/30 transition-all duration-300 ease-linear hover:scale-105 cursor-pointer flex flex-col justify-between home3card pb-[1vw]">
      {/* Image */}
      <div className="relative h-[50%] home3card1">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        {/* Status */}
        <span
          className={`absolute top-3 left-3 text-white text-xs font-medium px-2 py-1 rounded-lg shadow ${
            status === "Verified" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status}
        </span>

        {/* Time */}
        <span className="absolute top-3 right-3 bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-lg shadow">
          {time}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 h-full flex flex-col justify-between home3card2">
        <h2 className="text-[1vw] font-semibold text-gray-900">{title}</h2>
        <p className="text-[0.9vw] text-gray-600 mt-[0.2vw]">{description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-[1vw] home3card21">
          {/* Reporter */}
          <div className="flex items-center justify-between gap-[0.5vw] home3card211">
            <img src={reporterImg} alt={reporterName} className="w-8 h-8 rounded-full" />
            <p className="text-[0.8vw] text-gray-800">{reporterName}</p>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-[1vw] home3card212">
            <MapPin size={16} className="mr-1 text-pink-500" />
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};

const Hero3 = () => {
  return (
    <div className="w-screen h-dvh flex flex-col justify-center items-center bg-gray-100 px-[10vw] relative home3">
      {/* Section Title */}
      <div className="w-full py-[5vw] flex flex-col gap-[0.5vw] home31">
        <h1 className="text-[3vw] font-bold text-gray-700">Latest Crowd Reports</h1>
        <p className="text-[1.6vw] text-gray-600">
          Real-time hazard updates from our community of ocean guardians
        </p>
      </div>

      {/* Reports Container */}
      <div className="w-full flex justify-between items-center gap-6 home32">
        <ReportCard
          image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          status="Not Verified"
          time="2 min ago"
          title="Dangerous Rip Current"
          description="Strong rip current detected at Sunset Beach. Multiple swimmers struggling to return to shore."
          reporterImg="https://i.pravatar.cc/40?img=1"
          reporterName="Mike Johnson"
          location="Sunset Beach"
        />

        <ReportCard
          image="data:image/jpeg;base64,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"
          status="Verified"
          time="10 min ago"
          title="Jellyfish Swarm Alert"
          description="Large jellyfish swarm moving toward Marina Bay. Recommend avoiding water contact."
          reporterImg="https://i.pravatar.cc/40?img=2"
          reporterName="Sarah Chen"
          location="Marina Bay"
        />

        <ReportCard
          image="data:image/jpeg;base64,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"
          status="Verified"
          time="25 min ago"
          title="Shark Sighting"
          description="Shark spotted near Palm Cove. Lifeguards are clearing swimmers from the area."
          reporterImg="https://i.pravatar.cc/40?img=3"
          reporterName="David Lee"
          location="Palm Cove"
        />
      </div>
    </div>
  );
};

export default Hero3;
