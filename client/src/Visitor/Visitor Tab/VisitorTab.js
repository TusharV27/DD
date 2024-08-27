import React, { useState } from "react";

// Tooltip component
const Tooltip = ({ id, text }) => (
  <div
    id={id}
    role="tooltip"
    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
  >
    {text}
    <div className="tooltip-arrow" data-popper-arrow></div>
  </div>
);

// Menu item component
const MenuItem = ({ id, icon, text, isActive, onClick }) => (
  <button
    data-tooltip-target={id}
    type="button"
    className={`inline-flex flex-col items-center justify-center px-5 group`}
    onClick={onClick}
  >
    {icon}
    <span className="sr-only">{text}</span>
  </button>
);

const VisitorTab = () => {
  const [activeTab, setActiveTab] = useState("foodMenu");

  return (
    <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
        <MenuItem
          id="tooltip-food-menu"
          icon={
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6Zm-1 2H5v5h4V3ZM11 7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V7Zm1 1v6h4V8h-4Zm0 8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6Z" />
            </svg>
          }
          text="Food Menu"
          isActive={activeTab === "foodMenu"}
          onClick={() => setActiveTab("foodMenu")}
        />
        <MenuItem
          id="tooltip-event-offer"
          icon={
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M12 1a1 1 0 0 1 1 1v2h4a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V2a1 1 0 0 1 1-1h4Zm-1 4H6v1h5V5Zm0 2H6v1h5V7Zm-5 3h5v1H6v-1Zm0 2h5v1H6v-1Zm-3 2h13v-1H3v1Z" />
            </svg>
          }
          text="Event & Offer"
          isActive={activeTab === "eventOffer"}
          onClick={() => setActiveTab("eventOffer")}
        />
        <MenuItem
          id="tooltip-about-outlet"
          icon={
            <svg
              className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 1a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6Zm-1 2H5v5h4V3ZM11 7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V7Zm1 1v6h4V8h-4Zm0 8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h6Z" />
            </svg>
          }
          text="About Outlet"
          isActive={activeTab === "aboutOutlet"}
          onClick={() => setActiveTab("aboutOutlet")}
        />
      </div>
      <Tooltip id="tooltip-food-menu" text="Food Menu" />
      <Tooltip id="tooltip-event-offer" text="Event & Offer" />
      <Tooltip id="tooltip-about-outlet" text="About Outlet" />
    </div>
  );
};

export default VisitorTab;
