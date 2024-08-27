// src/components/VisitorForm.js
import React, { useState } from "react";
import axios from "axios";

const VisitorForm = ({ outletId }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [visitorDOB, setVisitorDOB] = useState("");
  const [visitingDateTime, setVisitingDateTime] = useState("");

  // Check if form fields are empty
  const isFormEmpty = !mobileNumber && !visitorDOB && !visitingDateTime;

  // Function to get the current date and time in ISO format
  const getCurrentDateTime = () => new Date().toISOString();

  const handleSubmit = async (accepted) => {
    try {
      // Automatically set visitingDateTime to the current date and time
      // const currentVisitingDateTime = getCurrentDateTime();

      // Handle no thanks if form is empty
      const response = await axios.post(
        `http://localhost:5000/api/visitor-response/66b9da23f7866495e87029fd`,
        {
          mobileNumber: accepted ? mobileNumber : "", // For "No Thanks", send empty data
          visitorDOB: accepted ? visitorDOB : "", // For "No Thanks", send empty data
          visitingDateTime: accepted ? visitingDateTime : getCurrentDateTime(),
          accepted,
        }
      );
      alert("Response recorded successfully");
      // Reset form fields
      setMobileNumber("");
      setVisitorDOB("");
      setVisitingDateTime("");
    } catch (error) {
      console.error("Error recording response:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Visitor Form</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number:
          </label>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            disabled={!isFormEmpty && !visitorDOB && !visitingDateTime}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth:
          </label>
          <input
            type="date"
            value={visitorDOB}
            onChange={(e) => setVisitorDOB(e.target.value)}
            disabled={!isFormEmpty && !mobileNumber && !visitingDateTime}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visiting Date & Time:
          </label>
          <input
            type="datetime-local"
            value={visitingDateTime}
            onChange={(e) => setVisitingDateTime(e.target.value)}
            disabled={!isFormEmpty && !mobileNumber && !visitorDOB}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          {isFormEmpty ? (
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              No Thanks
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleSubmit(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => handleSubmit(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                No Thanks
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default VisitorForm;
