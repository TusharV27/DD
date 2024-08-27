import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const AdminDescription = ({ eventDetails, setEventDetails }) => {
  const [isEventEditable, setIsEventEditable] = useState(false);
  const [isTermsEditable, setIsTermsEditable] = useState(false);

  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/admin/main/manage-events/4");
  };

  const handleEventChange = (e) => {
    setEventDetails({ ...eventDetails, eventDescription: e.target.value });
  };

  const handleTermsChange = (e) => {
    setEventDetails({ ...eventDetails, termsAndConditions: e.target.value });
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate("/admin/main/manage-events/2");
  };

  return (
    <div className="p-4 md:p-8">
      <form>
        {/* <div className="flex items-center mb-4 space-x-2">
          <span className="text-black">Basic Info</span>
          <div className="flex-grow h-[2px] bg-orange-500"></div>
          <span className="text-black">Tickets</span>
          <div className="flex-grow h-[2px] bg-orange-500"></div>
          <span className="text-orange-500">Description</span>
          <div className="flex-grow h-[2px] bg-gray-400"></div>
          <span>Review</span>
        </div> */}
        <div className="mb-4 relative">
          <label className="text-lg font-medium">Event</label>
          <FaRegEdit
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer text-gray-600"
            onClick={() => setIsEventEditable(!isEventEditable)}
          />
          <textarea
            value={eventDetails.eventDescription}
            onChange={handleEventChange}
            readOnly={!isEventEditable}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md resize-y bg-gray-50 disabled:bg-gray-200 disabled:text-gray-600"
          />
        </div>
        <div className="mb-4 relative">
          <label className="text-lg font-medium">Terms and Conditions</label>
          <FaRegEdit
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer text-gray-600"
            onClick={() => setIsTermsEditable(!isTermsEditable)}
          />
          <textarea
            value={eventDetails.termsAndConditions}
            onChange={handleTermsChange}
            readOnly={!isTermsEditable}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md resize-y bg-gray-50 disabled:bg-gray-200 disabled:text-gray-600"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminDescription;
