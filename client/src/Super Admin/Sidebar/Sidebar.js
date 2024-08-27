// Sidebar.js
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Sidebar = ({ isOpen, toggleDrawer }) => {
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/super-admin/main/restaurants":
        setSelectedItem("restaurants");
        break;
      case "/super-admin/main/reports":
        setSelectedItem("reports");
        break;
      case "/super-admin/main/events":
        setSelectedItem("events");
        break;
      case "/super-admin/main/offers":
        setSelectedItem("offers");
        break;
      default:
        setSelectedItem("dashboard");
        break;
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
              "dashboard",
              "restaurants",
              "reports",
              "events",
              "offers",
              "menu",
              "categories",
              "subcategories",
            ].map((item) => (
              <li key={item}>
                <Link
                  to={`${item === "dashboard" ? "" : item}`}
                  className={`flex items-center p-2 text-white rounded-lg ${
                    selectedItem === item
                      ? "bg-[#31363F]"
                      : "hover:bg-[#31363F]"
                  } group`}
                  onClick={() => {
                    setSelectedItem(item);
                    if (!isOpen) {
                      toggleDrawer(); // Close drawer when an item is clicked if the drawer is open
                    }
                  }}
                >
                  {/* Add appropriate SVG icons for each item */}
                  <span className="ms-3 capitalize">{item}</span>
                </Link>
              </li>
            ))}
          </ul>
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
            {["dashboard", "restaurants", "reports", "events", "offers"].map(
              (item) => (
                <li key={item}>
                  <Link
                    to={`${item === "dashboard" ? "" : item}`}
                    className={`flex items-center p-2 text-white rounded-lg ${
                      selectedItem === item
                        ? "bg-[#31363F]"
                        : "hover:bg-[#31363F]"
                    } group`}
                    onClick={() => {
                      setSelectedItem(item);
                      toggleDrawer(); // Close drawer when an item is clicked
                    }}
                  >
                    {/* Add appropriate SVG icons for each item */}
                    <span className="ms-3 capitalize">{item}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
