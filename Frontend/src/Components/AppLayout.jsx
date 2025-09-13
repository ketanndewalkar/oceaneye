import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = () => {
  return (
    <>
      <div className="w-dvw h-fit overflow-x-hidden">
        <Navbar/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  );
};

export default AppLayout;
