import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Sidebar = ({ isOpen, toggleDrawer }) => {
  const [selectedItem, setSelectedItem] = useState("Home");
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    if (path === "/admin/main/") {
      setSelectedItem("Home");
    } else {
      switch (path) {
        case "/admin/main/appearance":
          setSelectedItem("Appearance");
          break;
        case "/admin/main/analytics":
          setSelectedItem("Analytics");
          break;
        case "/admin/main/influencer-marketing":
          setSelectedItem("Influencer marketing");
          break;
        case "/admin/main/promotions":
          setSelectedItem("Promotions");
          break;
        case "/admin/main/reviews":
          setSelectedItem("Reviews");
          break;
        case "/admin/main/captain-settings":
          setSelectedItem("Captain Settings");
          break;
        case "/admin/main/outlet-settings":
          setSelectedItem("Outlet Settings");
          break;
        case "/admin/main/manage-events/0":
          setSelectedItem("Manage Events");
          break;
        default:
          setSelectedItem("Home");
          break;
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleDrawer();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleDrawer]);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear sessionStorage
    // Redirect to login or home page if necessary
    window.location.href = "/admin"; // Adjust the path as needed
  };

  return (
    <>
      {/* Navbar for mobile devices */}
      <Navbar isOpen={isOpen} toggleDrawer={toggleDrawer} />

      {/* Sidebar for larger screens */}
      <aside
        id="logo-sidebar"
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-8 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-black border-r border-gray-700 md:translate-x-0 md:block hidden`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-black">
          <h1 className="text-white text-3xl font-bold mb-10">Dining Dots</h1>
          <ul className="space-y-2 font-medium">
            {[
              { name: "Home", path: "/admin/main/" },
              { name: "Appearance", path: "/admin/main/appearance" },
              { name: "Analytics", path: "/admin/main/analytics" },
              {
                name: "Influencer marketing",
                path: "/admin/main/influencer-marketing",
              },
              { name: "Promotions", path: "/admin/main/promotions" },
              { name: "Reviews", path: "/admin/main/reviews" },
              {
                name: "Captain Settings",
                path: "/admin/main/captain-settings",
              },
              {
                name: "Outlet Settings",
                path: "/admin/main/outlet-settings",
              },
              {
                name: "Manage Events",
                path: "/admin/main/manage-events/0",
              },
            ].map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  className={`flex items-center p-2 text-white rounded-lg ${
                    selectedItem === name
                      ? "bg-[#31363F]"
                      : "hover:bg-[#31363F]"
                  } group`}
                  onClick={() => {
                    setSelectedItem(name);
                    if (!isOpen) {
                      toggleDrawer(); // Close drawer when an item is clicked if the drawer is open
                    }
                  }}
                >
                  {/* Add appropriate SVG icons for each item */}
                  <span className="ms-3 capitalize">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Logout Button */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-black border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-2 text-red-500 rounded-lg hover:bg-[#31363F] group"
            >
              <span className="ms-3 capitalize">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Drawer for mobile devices */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-64 h-screen bg-black z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:hidden`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-black">
          <ul className="space-y-2 font-medium">
            {[
              { name: "Home", path: "/admin/main/" },
              { name: "Appearance", path: "/admin/main/appearance" },
              { name: "Analytics", path: "/admin/main/analytics" },
              {
                name: "Influencer marketing",
                path: "/admin/main/influencer-marketing",
              },
              { name: "Promotions", path: "/admin/main/promotions" },
              { name: "Reviews", path: "/admin/main/reviews" },
              {
                name: "Captain Settings",
                path: "/admin/main/captain-settings",
              },
              {
                name: "Outlet Settings",
                path: "/admin/main/outlet-settings",
              },
              {
                name: "Manage Events",
                path: "/admin/main/manage-events",
              },
            ].map(({ name, path }) => (
              <li key={name}>
                <Link
                  to={path}
                  className={`flex items-center p-2 text-white rounded-lg ${
                    selectedItem === name
                      ? "bg-[#31363F]"
                      : "hover:bg-[#31363F]"
                  } group`}
                  onClick={() => {
                    setSelectedItem(name);
                    toggleDrawer(); // Close drawer when an item is clicked
                  }}
                >
                  {/* Add appropriate SVG icons for each item */}
                  <span className="ms-3 capitalize">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* Logout Button */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-black border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-2 text-red-500 rounded-lg hover:bg-[#31363F] group"
            >
              <span className="ms-3 capitalize">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
