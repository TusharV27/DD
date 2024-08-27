import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function SuperAdminMain() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      <Sidebar isOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for desktop and drawer for mobile */}
        <main
          className={`flex-1 p-6 transition-all pt-20 sm:pt-6 ${
            drawerOpen ? "ml-64" : "ml-0"
          } md:ml-64`}
        >
          {/* Main content goes here */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SuperAdminMain;
