import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Img from "./profile.jpg";

const initialRestaurants = [
  // Initial restaurant data
  {
    _id: "1",
    name: "The Gourmet Kitchen",
    owner: "John Doe",
    email: "john@example.com",
    mobileNumber: "+1234567890",
    quote: "Deliciousness in every bite!",
    password: "password123",
    isActive: true,
    coverImage: Img,
    specialities: ["Italian", "Continental"],
    address: "123 Gourmet St.",
    openDays: [
      { day: "Monday", startTime: "10:00", endTime: "22:00" },
      { day: "Tuesday", startTime: "10:00", endTime: "22:00" },
      { day: "Wednesday", startTime: "10:00", endTime: "22:00" },
      { day: "Thursday", startTime: "10:00", endTime: "22:00" },
      { day: "Friday", startTime: "10:00", endTime: "22:00" },
      { day: "Saturday", startTime: "10:00", endTime: "22:00" },
      { day: "Sunday", startTime: "10:00", endTime: "22:00" },
    ],
  },
];

export default function Restaurant() {
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [formData, setFormData] = useState({
    name: "",
    quote: "",
    mobileNumber: "",
    email: "",
    password: "",
    isActive: true,
    owner: "",
    coverImage: "",
    specialities: "",
    address: "",
    openDays: [
      { day: "Monday", startTime: "00:00", endTime: "23:59" },
      { day: "Tuesday", startTime: "00:00", endTime: "23:59" },
      { day: "Wednesday", startTime: "00:00", endTime: "23:59" },
      { day: "Thursday", startTime: "00:00", endTime: "23:59" },
      { day: "Friday", startTime: "00:00", endTime: "23:59" },
      { day: "Saturday", startTime: "00:00", endTime: "23:59" },
      { day: "Sunday", startTime: "00:00", endTime: "23:59" },
    ],
  });
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOpenDayChange = (index, e) => {
    const { name, value } = e.target;
    const newOpenDays = [...formData.openDays];
    newOpenDays[index] = { ...newOpenDays[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, openDays: newOpenDays }));
  };

  const handleAddOpenDay = () => {
    const allDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const newDays = allDays
      .filter(
        (day) =>
          !formData.openDays.some((existingDay) => existingDay.day === day)
      )
      .map((day) => ({ day, startTime: "00:00", endTime: "23:59" }));

    setFormData((prevData) => ({
      ...prevData,
      openDays: [...prevData.openDays, ...newDays],
    }));
  };

  const handleRemoveOpenDay = (index) => {
    const newOpenDays = formData.openDays.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, openDays: newOpenDays }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant._id === editId ? { ...formData, _id: editId } : restaurant
        )
      );
    } else {
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        { ...formData, _id: Date.now().toString() },
      ]);
    }
    setFormData({
      name: "",
      quote: "",
      mobileNumber: "",
      email: "",
      password: "",
      isActive: true,
      owner: "",
      coverImage: "",
      specialities: "",
      address: "",
      openDays: [
        { day: "Monday", startTime: "00:00", endTime: "23:59" },
        { day: "Tuesday", startTime: "00:00", endTime: "23:59" },
        { day: "Wednesday", startTime: "00:00", endTime: "23:59" },
        { day: "Thursday", startTime: "00:00", endTime: "23:59" },
        { day: "Friday", startTime: "00:00", endTime: "23:59" },
        { day: "Saturday", startTime: "00:00", endTime: "23:59" },
        { day: "Sunday", startTime: "00:00", endTime: "23:59" },
      ],
    });
    setEditId(null);
    setShowPopup(false); // Hide the popup after submission
  };

  const handleEdit = (id) => {
    const restaurant = restaurants.find((r) => r._id === id);
    setFormData(restaurant);
    setEditId(id);
    setShowPopup(true); // Show popup for editing
  };

  const handleDelete = (id) => {
    setRestaurants((prevRestaurants) =>
      prevRestaurants.filter((restaurant) => restaurant._id !== id)
    );
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-200 min-h-screen flex flex-col">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
        Restaurants List
      </h1>
      <button
        onClick={() => {
          setFormData({
            name: "",
            quote: "",
            mobileNumber: "",
            email: "",
            password: "",
            isActive: true,
            owner: "",
            coverImage: "",
            specialities: "",
            address: "",
            openDays: [
              { day: "Monday", startTime: "00:00", endTime: "23:59" },
              { day: "Tuesday", startTime: "00:00", endTime: "23:59" },
              { day: "Wednesday", startTime: "00:00", endTime: "23:59" },
              { day: "Thursday", startTime: "00:00", endTime: "23:59" },
              { day: "Friday", startTime: "00:00", endTime: "23:59" },
              { day: "Saturday", startTime: "00:00", endTime: "23:59" },
              { day: "Sunday", startTime: "00:00", endTime: "23:59" },
            ],
          });
          setEditId(null);
          setShowPopup(true);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-6 flex items-center"
      >
        <FaPlus className="mr-2" /> Add Restaurant
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 mb-8">
        {restaurants.map((member) => (
          <div
            key={member._id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center text-center space-y-4 h-auto sm:h-80 justify-between border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={member.coverImage || Img}
              alt={member.name}
              className="w-24 sm:w-32 h-24 sm:h-32 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <p className="text-base sm:text-lg font-semibold text-gray-900">
                {member.name}
              </p>
              <p className="text-sm sm:text-gray-700">{member.owner}</p>
            </div>
            <div className="w-full">
              <div className="border-t-2 border-gray-300 mb-2"></div>
              <div className="flex flex-col sm:flex-row sm:space-x-2">
                <button
                  className="text-red-500 w-full sm:w-1/2 flex items-center justify-center space-x-1 text-center hover:bg-gray-100 rounded-lg py-2 transition duration-300"
                  onClick={() => handleDelete(member._id)}
                >
                  <FaTrash className="text-lg sm:text-xl" />
                  <span className="pl-1 sm:pl-2 text-sm sm:text-base">
                    Delete
                  </span>
                </button>
                <button
                  className="text-blue-500 w-full sm:w-1/2 flex items-center justify-center space-x-1 text-center hover:bg-gray-100 rounded-lg py-2 transition duration-300"
                  onClick={() => handleEdit(member._id)}
                >
                  <FaEdit className="text-lg sm:text-xl" />
                  <span className="pl-1 sm:pl-2 text-sm sm:text-base">
                    Edit
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Component */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-[90%] overflow-hidden">
            <div className="h-full overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                {editId ? "Edit Restaurant" : "Add Restaurant"}
              </h2>
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Quote</label>
                  <input
                    type="text"
                    name="quote"
                    value={formData.quote}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Owner</label>
                  <input
                    type="text"
                    name="owner"
                    value={formData.owner}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Cover Image URL</label>
                  <input
                    type="text"
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Specialities (comma separated)
                  </label>
                  <input
                    type="text"
                    name="specialities"
                    value={formData.specialities}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        specialities: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      }))
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Open Days</label>
                  {formData.openDays.map((day, index) => (
                    <div key={index} className="mb-2 flex space-x-2">
                      <input
                        type="text"
                        name="day"
                        value={day.day}
                        onChange={(e) => handleOpenDayChange(index, e)}
                        placeholder="Day"
                        className="w-1/3 px-3 py-2 border rounded"
                        required
                        readOnly
                      />
                      <input
                        type="text"
                        name="startTime"
                        value={day.startTime}
                        onChange={(e) => handleOpenDayChange(index, e)}
                        placeholder="Start Time"
                        className="w-1/3 px-3 py-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        name="endTime"
                        value={day.endTime}
                        onChange={(e) => handleOpenDayChange(index, e)}
                        placeholder="End Time"
                        className="w-1/3 px-3 py-2 border rounded"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOpenDay(index)}
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddOpenDay}
                    className="text-blue-500"
                  >
                    Add Open Day
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editId ? "Update Restaurant" : "Add Restaurant"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="bg-blue-500 text-white px-4 py-2 ml-5 rounded"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
