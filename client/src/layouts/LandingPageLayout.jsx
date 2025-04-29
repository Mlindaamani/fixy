import React from "react";
import { NavigationBar } from "../components/NavigationBar";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div className="min-h-screen p-0 m-0">
      <NavigationBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingPageLayout;
