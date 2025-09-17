import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const AppLayout = () => {
  return (
    <>
      <div className="w-screen h-fit overflow-x-hidden bg-gray-200relative">
        <Navbar/>
        <Outlet/>
        <Footer/>
        
      </div>
    </>
  );
};

export default AppLayout;
