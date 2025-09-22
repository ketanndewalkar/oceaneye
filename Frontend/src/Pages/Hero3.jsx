import React from "react";
import { MapPin } from "lucide-react";

const ReportCard = ({ image, title, description }) => {
  return (
    <div className="size-[22vw] rounded-lg border border-gray-200 overflow-hidden shadow-2xl shadow-black/30 hover:border-2 hover:border-b-blue-600  transition-all duration-300 ease-linear hover:scale-105 cursor-pointer flex flex-col justify-between home3card pb-[1vw]">
      {/* Image */}
      <div className="relative h-[50%] home3card1">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 h-full flex flex-col justify-between home3card2">
        <h2 className="text-[1vw] font-semibold text-gray-900">{title}</h2>
        <p className="text-[0.9vw] text-gray-600 mt-[0.2vw]">{description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-[1vw] home3card21"></div>
      </div>
    </div>
  );
};

const Hero3 = () => {
  return (
    <div className="w-screen h-fit flex flex-col justify-center items-center bg-gray-100 px-[10vw] relative home3 pb-[3vw]">
      {/* Section Title */}
      <div className="w-full py-[5vw] flex flex-col gap-[0.5vw] home31">
        <h1 className="text-[3vw] font-bold text-gray-700">
          What What OceanEye Offers{" "}
        </h1>
        <p className="text-[1.6vw] text-gray-600">
          OceanEye makes it super easy to spot, report, and protect our
          oceans—together.
        </p>
      </div>

      {/* Reports Container */}
      <div className="w-full flex justify-between items-center gap-6 home32 ">
        {/* card-1 */}
        <ReportCard
          image="/assets/spotharzard.jpeg"
          title="📍Spot Hazards Fast"
          description="Quickly capture and report ocean hazards with just a tap — simple, fast, and effective."
        />
    {/* card-2 */}
        <ReportCard
          image="/assets/map.png"
          title=" 🗺 Interactive Map View"
          description="See all reported hazards on a live map so you know exactly what’s happening around you."
        />
 {/* card-3 */}
        <ReportCard
          image="/assets/verification.jpg"
          title="✅ Two-Step Verification"
          description="Every report is checked by both a moderator and an official, so only trusted information appears on the map."
        />
 {/* card-4 */}
        <ReportCard
          image="/assets/community.jpg"
          title="🤝 Community Powered"
          description="Join a growing network of ocean watchers where every report helps protect our waters."
        />
      </div>
    </div>
  );
};

export default Hero3;
