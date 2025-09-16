import React, { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-screen h-[15vh] py-[1vw] px-[4vw] absolute top-0 left-0 z-[200] nav">
      <div className="size-full relative">
        <nav className="w-full h-full flex justify-between items-center rounded-lg px-[3vw] bg-white/50 backdrop-blur-md border border-white/30 shadow-lg nav1">
          
          {/* Logo Section */}
          <div className="w-fit flex items-center h-full p-[0.2vw] shrink-0 nav11">
            <img
              src="/assets/Logo.png"
              alt="INCOIS Logo"
              className="mix-blend-multiply h-full"
            />
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex w-full justify-end gap-[3vw] items-center text-[1.2vw] font-semibold nav12">
            <li>
              <Link to="/" className="hover:text-[#24a392] transition-all duration-300 ease-linear">
                Home
              </Link>
            </li>
            <li>
              <Link to="/liveAlerts" className="hover:text-[#24a392] transition-all duration-300 ease-linear">
                Live Alerts
              </Link>
            </li>
            <li>
              <Link to="/reportIncident" className="hover:text-[#24a392] transition-all duration-300 ease-linear">
                Report Incident
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#24a392] transition-all duration-300 ease-linear">
                About INCOIS
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#24a392] transition-all duration-300 ease-linear">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="px-[2vw] py-[0.5vw] rounded-lg text-white bg-[#389bcd] transition-all duration-200 ease-linear hover:scale-95 hover:cursor-pointer"
              >
                Register
              </Link>
            </li>
          </ul>

          {/* Hamburger Icon (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-black focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-[8vh] md:top-[15vh] left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg rounded-3xl">
            <ul className="flex flex-col items-center gap-6 py-6 text-lg font-semibold">
              <li>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/liveAlerts" onClick={() => setIsOpen(false)}>
                  Live Alerts
                </Link>
              </li>
              <li>
                <Link to="/reportIncident" onClick={() => setIsOpen(false)}>
                  Report Incident
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsOpen(false)}>
                  About INCOIS
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 rounded-lg text-white bg-[#389bcd] transition-all duration-200 ease-linear hover:scale-95"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
