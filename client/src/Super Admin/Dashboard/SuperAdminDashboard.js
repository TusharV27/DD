import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { apiUrl } from "../../Env/EnvExport";

const SuperAdminDashboard = () => {
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/superadmin/outlets`);
        setRestaurantsData(response.data);
      } catch (err) {
        setError("Failed to fetch restaurants.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      // Toggle the status
      const updatedStatus = !currentStatus;

      // Update the status on the server
      await axios.post(`${apiUrl}/api/superadmin/outlets/${id}`, {
        isActive: updatedStatus,
      });

      // Update the status locally
      setRestaurantsData((prevData) =>
        prevData.map((r) =>
          r._id === id ? { ...r, isActive: updatedStatus } : r
        )
      );
    } catch (err) {
      setError("Failed to update restaurant status.");
      console.error(err);
    }
  };

  const totalRestaurants = restaurantsData.length;
  const totalActive = restaurantsData.filter((r) => r.isActive).length;
  const totalInactive = restaurantsData.filter((r) => !r.isActive).length;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Box Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Date Box */}
        <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              {dayjs().format("MMMM D, YYYY")}
            </h2>
          </div>
        </div>
        {/* Total Restaurants Box */}
        <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              {totalRestaurants}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Total Restaurants
            </p>
          </div>
        </div>
        {/* Total Active Restaurants Box */}
        <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
              {totalActive}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Active Restaurants
            </p>
          </div>
        </div>
        {/* Total Inactive Restaurants Box */}
        <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600">
              {totalInactive}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Inactive Restaurants
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-4 sm:p-6 shadow-lg rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Restaurant Name
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Daily Visitors
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {restaurantsData.map((restaurant) => (
              <tr key={restaurant._id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                  {restaurant.restaurantName}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                  {restaurant.dailyVisitors}
                </td>
                <td
                  className={`px-4 py-2 whitespace-nowrap text-sm font-medium ${
                    restaurant.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {restaurant.isActive ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium flex gap-2">
                  <button
                    onClick={() =>
                      toggleStatus(restaurant._id, restaurant.isActive)
                    }
                    className={`px-3 py-1.5 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                      restaurant.isActive
                        ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                        : "bg-red-500 hover:bg-red-600 focus:ring-red-500"
                    }`}
                  >
                    Toggle Status
                  </button>
                  <button className="px-3 py-1.5 text-indigo-600 font-bold rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-end">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
