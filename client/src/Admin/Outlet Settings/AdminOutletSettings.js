// import React from "react";

// const AdminOutletSettings = () => {
//   return (
//     <div className="flex flex-col lg:flex-row">
//       {/* Main Content */}
//       <div className="flex-1 p-4 lg:p-10">
//         <h1 className="text-2xl font-bold">Outlet Settings</h1>
//         <div className="flex flex-col lg:flex-row mt-10 space-y-6 lg:space-y-0 lg:space-x-6">
//           <div className="flex-1 space-y-6 lg:space-y-8">
//             <div>
//               <h2 className="text-xl font-medium">Cover image</h2>
//               <img
//                 src="/Image2.svg"
//                 alt="Cover"
//                 className="mt-2 w-full max-w-[393px] h-auto"
//               />
//             </div>

//             <div>
//               <h2 className="text-xl font-medium">Restaurant name</h2>
//               <div className="border border-gray-300 rounded-md p-2 mt-2">
//                 <span className="text-lg font-medium text-gray-700">
//                   True Tramm Trunk
//                 </span>
//               </div>
//             </div>

//             <div>
//               <h2 className="text-xl font-medium">Specialities</h2>
//               <div className="border border-gray-300 rounded-md p-2 mt-2">
//                 <span className="text-lg font-medium text-gray-700">
//                   Indian, Chinese, Fastfood, Pasta
//                 </span>
//               </div>
//             </div>

//             <div>
//               <h2 className="text-xl font-medium">Address</h2>
//               <div className="border border-gray-300 rounded-md p-2 mt-2">
//                 <span className="text-lg text-gray-700">
//                   First floor, VL Mehta Road, J.V.P.D. Scheme, Next to Options
//                   Showroom, Juhu, Mumbai, Maharashtra 400049
//                 </span>
//               </div>
//             </div>

//             <div>
//               <h2 className="text-xl font-medium">Facilities</h2>
//               <div className="border border-gray-300 rounded-md p-4 mt-2 space-y-4 bg-white">
//                 {[
//                   "Home Delivery",
//                   "Takeaway available",
//                   "Indoor sitting",
//                   "WIFI Available",
//                   "Rooftop sitting Available",
//                 ].map((facility, index) => (
//                   <div
//                     key={index}
//                     className="flex justify-between items-center"
//                   >
//                     <span className="text-lg">{facility}</span>
//                     <input
//                       type="checkbox"
//                       className="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h2 className="text-xl font-medium">Photos</h2>
//               <div className="max-w-sm mx-3 ">
//                 <div className="grid grid-cols-3 gap-2">
//                   <div className="col-span-2">
//                     <img
//                       src="https://media.licdn.com/dms/image/D5612AQG-yGcWhlScAA/article-cover_image-shrink_720_1280/0/1709044661596?e=2147483647&v=beta&t=GqDB-bC3kiqrtNCrEnWbZanUEGStG0iC8JK0n0N07Us"
//                       alt="Group Photo"
//                       className="w-full h-44 rounded-lg"
//                     />
//                   </div>
//                   <div className="col-span-1">
//                     <img
//                       src="https://assets.cntraveller.in/photos/63d8e5103d7229d4cf308f01/1:1/w_640,c_limit/Prequel-lead.jpg"
//                       alt="Outdoor Cafe"
//                       className="w-full h-20 rounded-lg"
//                     />
//                     <img
//                       src="https://as1.ftcdn.net/v2/jpg/03/24/73/92/1000_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"
//                       alt="Outdoor Cafe"
//                       className="w-full h-22 rounded-lg mt-1"
//                     />
//                   </div>
//                   <div>
//                     <img
//                       src="https://static01.nyt.com/images/2023/10/10/multimedia/10best-restaurants-seattle-cover2-kfqg/10best-restaurants-seattle-cover2-kfqg-mobileMasterAt3x.jpg?quality=75&auto=webp&disable=upscale&width=1800"
//                       alt="Night Market"
//                       className="w-full h-22 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <img
//                       src="https://static01.nyt.com/images/2023/10/10/multimedia/10best-restaurants-seattle-cover2-kfqg/10best-restaurants-seattle-cover2-kfqg-mobileMasterAt3x.jpg?quality=75&auto=webp&disable=upscale&width=1800"
//                       alt="Bridge Night View"
//                       className="w-full h-22 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <img
//                       src="https://assets.cntraveller.in/photos/64ccfda2500968bfe5b8a89d/4:3/w_640,c_limit/The%20Scene%20-%20Banglore%209%20pg.jpg"
//                       alt="Bar Interior"
//                       className="w-full h-22 rounded-lg"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="hidden lg:block w-full lg:w-80 lg:ml-10"></div>
//         </div>

//         {/* Open Days */}
//         <div className="mt-10 bg-white p-4 lg:p-6 rounded-md border border-gray-300">
//           <h2 className="text-xl font-medium">Open days</h2>
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {[
//               "Sunday",
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//             ].map((day, index) => (
//               <div
//                 key={index}
//                 className="flex items-center bg-white p-4 rounded-md border border-gray-300"
//               >
//                 <span className="font-bold text-lg">{day}</span>
//                 <input
//                   type="checkbox"
//                   className="w-6 h-6 ml-3 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
//                 />
//                 <div className="flex items-center ml-auto space-x-2">
//                   <div className="border border-gray-200 p-2 rounded-md w-24 text-center">
//                     <span className="text-sm">10:00 AM</span>
//                   </div>
//                   <span className="text-sm">To</span>
//                   <div className="border border-gray-200 p-2 rounded-md w-24 text-center">
//                     <span className="text-sm">3:00 PM</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminOutletSettings;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../Env/EnvExport";

const AdminOutletSettings = () => {
  const [outletData, setOutletData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newData, setNewData] = useState({}); // Adjust according to the data you need to add
  const [updateData, setUpdateData] = useState({}); // Adjust according to the data you need to update

  const API_URL = "http://localhost:5000/outlets"; // Replace with your actual API URL

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await JSON.parse(sessionStorage.getItem("restAdmin"));
        console.log(data._id);
        const response = await axios.get(`${apiUrl}/outlets/${data._id}`);
        console.log(response);
        setOutletData(response.data);
      } catch (error) {
        setError("Failed to fetch outlet data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(API_URL, updateData);
      // Optionally, refetch the data or update state here
    } catch (error) {
      setError("Failed to update outlet data");
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API_URL, newData);
      // Optionally, refetch the data or update state here
    } catch (error) {
      setError("Failed to add outlet data");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-10">
        <h1 className="text-2xl font-bold">Outlet Settings</h1>
        <div className="flex flex-col lg:flex-row mt-10 space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="flex-1 space-y-6 lg:space-y-8">
            <div>
              <h2 className="text-xl font-medium">Cover image</h2>
              <img
                src={"/Image2.svg"}
                alt="Cover"
                className="mt-2 w-full max-w-[393px] h-auto"
              />
            </div>

            <div>
              <h2 className="text-xl font-medium">Restaurant name</h2>
              <div className="border border-gray-300 rounded-md p-2 mt-2">
                <span className="text-lg font-medium text-gray-700">
                  {outletData?.restaurantName || "N/A"}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium">Specialities</h2>
              <div className="border border-gray-300 rounded-md p-2 mt-2">
                <span className="text-lg font-medium text-gray-700">
                  {outletData?.specialities || "N/A"}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium">Address</h2>
              <div className="border border-gray-300 rounded-md p-2 mt-2">
                <span className="text-lg text-gray-700">
                  {outletData?.address || "N/A"}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium">Facilities</h2>
              <div className="border border-gray-300 rounded-md p-4 mt-2 space-y-4 bg-white">
                {(outletData?.facilities || []).map((facility, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-lg">{facility.facility}</span>
                    <input
                      type="checkbox"
                      checked={facility.isActive || false}
                      onChange={() => {
                        // Handle checkbox change, possibly with setUpdateData
                      }}
                      className="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="max-w-sm mx-3 ">
              <h2 className="text-lg font-semibold mb-4 text-black">Photos</h2>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <img
                    src="https://media.licdn.com/dms/image/D5612AQG-yGcWhlScAA/article-cover_image-shrink_720_1280/0/1709044661596?e=2147483647&v=beta&t=GqDB-bC3kiqrtNCrEnWbZanUEGStG0iC8JK0n0N07Us"
                    alt="Group Photo"
                    className="w-full h-44 rounded-lg"
                  />
                </div>
                <div className="col-span-1">
                  <img
                    src="https://assets.cntraveller.in/photos/63d8e5103d7229d4cf308f01/1:1/w_640,c_limit/Prequel-lead.jpg"
                    alt="Outdoor Cafe"
                    className="w-full h-20 rounded-lg"
                  />
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/03/24/73/92/1000_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"
                    alt="Outdoor Cafe"
                    className="w-full h-22 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <img
                    src="https://static01.nyt.com/images/2023/10/10/multimedia/10best-restaurants-seattle-cover2-kfqg/10best-restaurants-seattle-cover2-kfqg-mobileMasterAt3x.jpg?quality=75&auto=webp&disable=upscale&width=1800"
                    alt="Night Market"
                    className="w-full h-22 rounded-lg"
                  />
                </div>
                <div>
                  <img
                    src="https://static01.nyt.com/images/2023/10/10/multimedia/10best-restaurants-seattle-cover2-kfqg/10best-restaurants-seattle-cover2-kfqg-mobileMasterAt3x.jpg?quality=75&auto=webp&disable=upscale&width=1800"
                    alt="Bridge Night View"
                    className="w-full h-22 rounded-lg"
                  />
                </div>
                <div>
                  <img
                    src="https://assets.cntraveller.in/photos/64ccfda2500968bfe5b8a89d/4:3/w_640,c_limit/The%20Scene%20-%20Banglore%209%20pg.jpg"
                    alt="Bar Interior"
                    className="w-full h-22 rounded-lg"
                  />
                </div>
              </div>
            </div>
            {/* <div>
              <h2 className="text-xl font-medium">Photos</h2>
              <div className="max-w-sm mx-3">
                <div className="grid grid-cols-3 gap-2">
                  {outletData?.photos?.map((photo, index) => (
                    <div key={index}>
                      <img
                        src={photo.url}
                        alt={photo.alt || "Photo"}
                        className="w-full h-22 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Side */}
          <div className="hidden lg:block w-full lg:w-80 lg:ml-10"></div>
        </div>

        {/* Open Days */}
        <div className="mt-10 bg-white p-4 lg:p-6 rounded-md border border-gray-300">
          <h2 className="text-xl font-medium">Open days</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outletData?.openDays.map((day, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-4 rounded-md border border-gray-300"
              >
                <span className="font-bold text-lg">{day.day}</span>
                <input
                  type="checkbox"
                  checked={day.isOpen}
                  className="w-6 h-6 ml-3 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                />
                {day.isOpen ? (
                  <div className="flex items-center ml-auto space-x-2">
                    <div className="border border-gray-200 p-2 rounded-md w-24 text-center">
                      <span className="text-sm">{day.openingTime}</span>
                    </div>
                    <span className="text-sm">To</span>
                    <div className="border border-gray-200 p-2 rounded-md w-24 text-center">
                      <span className="text-sm">{day.closingTime}</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add and Update Buttons */}
        <div className="mt-10">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded-md ml-4"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOutletSettings;
