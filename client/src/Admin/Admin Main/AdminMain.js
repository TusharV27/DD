import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { apiUrl } from "../../Env/EnvExport";
import axios from "axios";

function AdminMain() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  async function checkActiveStatus() {
    try {
      const response = await axios.get(
        `${apiUrl}/outlets/status/${
          JSON.parse(sessionStorage.getItem("restAdmin"))._id
        }`
      );
      if (!response.data.active) {
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      navigate("/admin");
    }
  }

  useEffect(() => {
    // Check login status from sessionStorage
    checkActiveStatus();
  });

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("login");

    if (isLoggedIn !== "true") {
      // If not logged in, redirect to login page
      navigate("/admin"); // Adjust the route to your login page
    }
  }, [navigate]);

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

export default AdminMain;
