import React, { useState, useEffect } from "react";
import AdminEvent from "./AdminEvent";
import { useParams, useNavigate } from "react-router-dom";
import AdminCreateEvent from "./AdminCreateEvent";
import AdminTicket from "./AdminTicket";
import AdminDescription from "./AdminDescription";
import AdminReview from "./AdminReview";

import event1 from "./event1.jpg";

function AdminMainEvent() {
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState({
    image: event1, // Update this path as necessary
    eventName: "",
    eventCity: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    eventPrice: "",
    ticketName: "",
    ticketType: "Single Entry",
    totalTickets: "",
    ticketDescription: "",
    eventDescription: "Tired of heart shaped chocolate and cheese love song",
    termsAndConditions: "If you have denied entry, please call your SPOC",
  });
  const { pageId } = useParams();
  const [page, setPage] = useState();

  useEffect(() => {
    if (pageId === "0") {
      setPage(<AdminEvent />);
    } else {
      switch (pageId) {
        case "1":
          setPage(<AdminCreateEvent />);
          break;
        case "2":
          setPage(<AdminTicket setEventDetails={setEventDetails} />);
          break;
        case "3":
          setPage(
            <AdminDescription
              eventDetails={eventDetails}
              setEventDetails={setEventDetails}
            />
          );
          break;
        case "4":
          setPage(<AdminReview />);
          break;
        default:
          setPage(<AdminEvent />);
          break;
      }
    }
  }, [pageId]);

  const handleBackClick = (e) => {
    e.preventDefault();
    if (pageId === "1") {
      const userConfirmed = window.confirm("Are you sure you want to go back?");

      // If the user confirms, navigate to the desired path
      if (userConfirmed) {
        navigate(
          `/admin/main/manage-events/${(Number(pageId) - 1).toString()}`
        );
      }
    } else {
      navigate(`/admin/main/manage-events/${(Number(pageId) - 1).toString()}`);
    }
  };

  const handleNextClick = () => {
    navigate(`/admin/main/manage-events/${(Number(pageId) + 1).toString()}`);
  };

  return (
    <div>
      {pageId === "0" ? (
        <>{page}</>
      ) : (
        <div className="p-4 md:p-8">
          <form>
            <div className="flex items-center mb-4 space-x-2">
              <span
                className={`font-bold text-[24px] ${
                  pageId >= 1 ? "text-orange-500" : "text-black"
                }`}
              >
                Basic Info
              </span>
              <div
                className={`flex-grow h-[4px] rounded-full ${
                  pageId >= 2 ? "bg-orange-400" : "bg-gray-600"
                } `}
              ></div>
              <span
                className={`font-bold text-[24px] ${
                  pageId >= 2 ? "text-orange-500" : "text-gray-600"
                }`}
              >
                Tickets
              </span>
              <div
                className={`flex-grow h-[4px] rounded-full ${
                  pageId >= 3 ? "bg-orange-400" : "bg-gray-600"
                } `}
              ></div>
              <span
                className={`font-bold text-[24px] ${
                  pageId >= 3 ? "text-orange-500" : "text-gray-600"
                }`}
              >
                Description
              </span>
              <div
                className={`flex-grow h-[4px] rounded-full ${
                  pageId >= 4 ? "bg-orange-400" : "bg-gray-600"
                } `}
              ></div>
              <span
                className={`font-bold text-[24px] ${
                  pageId >= 4 ? "text-orange-500" : "text-gray-600"
                }`}
              >
                Review
              </span>
            </div>
            <div className="mb-4 relative">{page}</div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="px-4 py-2 text-white bg-gray-500 rounded-md"
                onClick={handleBackClick}
              >
                Back
              </button>
              {pageId === "4" ? (
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-orange-500 rounded-md"
                  onClick={() => alert("ok")}
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-orange-500 rounded-md"
                  onClick={handleNextClick}
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminMainEvent;
