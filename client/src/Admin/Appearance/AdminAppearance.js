import React, { useState, useEffect } from "react";
import WelcomePage from "./WelcomePage";
import MainMenuPage from "./MainMenuPage";
// import { apiUrl } from "../../EnvExpot";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminAppearance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("welcome");
  const [resData, setResData] = useState([]);
  const [name, setName] = useState("Dining Dots");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const data = sessionStorage.getItem("data");
  //         if (data) {
  //           const parsedData = JSON.parse(data);
  //           setName(parsedData[0].name);
  //           const response = await axios.post(`${apiUrl}/api/getrestaurant`, {
  //             restaurantId: parsedData[0]._id,
  //           });
  //           setResData(response.data);
  //         }
  //       } catch (error) {
  //         console.error("Error fetching restaurant data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row items-center mb-5 sticky top-0 bg-white z-10">
        <div className="bg-[#FE724C] text-center text-white min-w-[140px] px-5 py-2 rounded">
          {name}
        </div>
        <div className="flex flex-wrap md:flex-nowrap md:ml-10 mt-4 md:mt-0">
          <button
            className={`p-2 rounded-lg mx-2 ${
              activeTab === "welcome"
                ? "font-bold text-[#FE724C]"
                : "text-black"
            }`}
            onClick={() => handleTabClick("welcome")}
          >
            Welcome Page
          </button>
          <button
            className={`p-2 rounded-lg mx-2 ${
              activeTab === "mainMenu"
                ? "font-bold text-[#FE724C]"
                : "text-black"
            }`}
            onClick={() => handleTabClick("mainMenu")}
          >
            Main Menu Page
          </button>
        </div>
      </div>

      <div className="tab-content w-full space-y-5">
        {activeTab === "welcome" && (
          <section>
            <WelcomePage />
          </section>
        )}
        {activeTab === "mainMenu" && (
          <section>
            <MainMenuPage />
          </section>
        )}
      </div>
    </div>
  );
}

export default AdminAppearance;
