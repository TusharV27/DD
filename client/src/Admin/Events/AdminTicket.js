import { useNavigate } from "react-router-dom";
import eventImage from "./ticket.jpg"; // Import the initial image
import updatedImage from "./update.jpg"; // Import the updated image
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";

const AdminTicket = ({ setEventDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketName, setTicketName] = useState("");
  const [ticketType, setTicketType] = useState("Single Entry");
  const [totalTickets, setTotalTickets] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [isTicketAdded, setIsTicketAdded] = useState(false);

  const navigate = useNavigate();

  const handleAddTicketClick = () => setIsModalOpen(true);
  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsTicketAdded(true);
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      ticketName,
      ticketType,
      totalTickets,
      ticketDescription,
    }));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-4 bg-white shadow-md rounded-md">
        <form>
          {/* <div className="flex items-center mb-4">
            <span className="text-black px-2 py-1 rounded-md bg-gray-200 text-sm font-medium">
              Basic Info
            </span>
            <div className="flex-grow h-px bg-gray-300 mx-2"></div>
            <span className="text-orange-600 px-2 py-1 rounded-md bg-gray-200 text-sm font-medium">
              Tickets
            </span>
            <div className="flex-grow h-px bg-gray-300 mx-2"></div>
            <span className="text-gray-500 px-2 py-1 rounded-md bg-gray-200 text-sm font-medium">
              Description
            </span>
            <div className="flex-grow h-px bg-gray-300 mx-2"></div>
            <span className="text-gray-500 px-2 py-1 rounded-md bg-gray-200 text-sm font-medium">
              Review
            </span>
          </div> */}
          <div
            className={`flex flex-col items-center justify-center w-full h-48 border-2 rounded-lg bg-gray-100 shadow-lg ${
              isTicketAdded ? "border-green-500" : "border-orange-500"
            } relative`}
          >
            <img
              src={isTicketAdded ? updatedImage : eventImage}
              alt="Ticket Icon"
              className="w-24 h-24"
            />
            {isTicketAdded ? (
              <>
                <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md">
                  Ticket Added
                </button>
                <span className="absolute top-2 right-2 text-xl cursor-pointer">
                  <FaRegEdit />
                </span>
              </>
            ) : (
              <button
                type="button"
                onClick={handleAddTicketClick}
                className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md"
              >
                + Add tickets for your event
              </button>
            )}
          </div>
        </form>
        {/* <div className="flex justify-between mt-4">
          <button
            type="button"
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
            onClick={handleBackClick}
          >
            Back
          </button>
          <button
            type="button"
            className="bg-orange-500 text-white py-2 px-4 rounded-md"
            onClick={handleNextClick}
          >
            Next
          </button>
        </div> */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <form onSubmit={handleSaveClick}>
              <label className="block text-sm font-medium text-gray-700">
                Ticket Name
              </label>
              <input
                type="text"
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Ticket Type
              </label>
              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="Single Entry">Single Entry</option>
                <option value="Multiple Entry">Multiple Entry</option>
              </select>
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Total Tickets Available
              </label>
              <input
                type="number"
                value={totalTickets}
                onChange={(e) => setTotalTickets(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Ticket Brief Description
              </label>
              <textarea
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              ></textarea>
              <button
                type="submit"
                className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminTicket;
