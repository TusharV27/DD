import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
// import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import event1 from "./event1.jpg";
import event2 from "./event2.jpg";

const events = [
  {
    image: event1,
    EventName: "Saturday Night with Alexa",
    EventCity: "Mumbai, India",
    Date: "2024-08-17", // example date
    startTime: "21:00",
    endTime: "01:00",
    EventPrice: "₹500",
    Ticket: {
      Name: "Standard Ticket",
      Type: "Single Entry",
      TotalAvailableTickets: 100,
      TicketBrief: "Standard access to the event.",
    },
    EventDescription: `Join us for a night of electrifying music and entertainment with Alexa. This event promises to be an unforgettable experience with live performances, engaging activities, and a vibrant crowd. Enjoy a variety of music genres and make memories that will last a lifetime. Whether you're a music lover or just looking for a fun night out, this event is perfect for you. Bring your friends and dance the night away in the heart of Mumbai. Don't miss out on this amazing opportunity to experience an evening filled with excitement and joy.`,
    TermsAndConditions: `1. Tickets are non-refundable and non-transferable. 2. No outside food or beverages allowed. 3. The event organizers reserve the right to refuse entry. 4. Please bring a valid ID for verification. 5. In case of cancellation, the event may be rescheduled or refunded based on the organizer's decision.`,
    EventFlyer: event1, // image reference
  },
  {
    image: event2,
    EventName: "Sunday Funday with John",
    EventCity: "Pune, India",
    Date: "2024-08-18", // example date
    startTime: "17:00",
    endTime: "22:00",
    EventPrice: "₹300",
    Ticket: {
      Name: "VIP Ticket",
      Type: "Multiple Entry",
      TotalAvailableTickets: 50,
      TicketBrief: "VIP access with exclusive benefits.",
    },
    EventDescription: `Experience a fun-filled Sunday with John in Pune! This event features a range of exciting activities, live entertainment, and interactive sessions. Whether you're looking to enjoy some live music, participate in games, or simply relax and have a good time, this event has something for everyone. The VIP experience offers exclusive benefits, including priority access and special perks. Gather your friends and join us for an unforgettable Sunday evening. Don’t miss out on this fantastic opportunity to unwind and enjoy.`,
    TermsAndConditions: `1. VIP tickets offer additional benefits but are still subject to all standard event rules. 2. Tickets are non-refundable. 3. Attendees must adhere to the event's code of conduct. 4. The organizer is not responsible for lost or stolen items. 5. The event may be subject to changes in timing or location.`,
    EventFlyer: event2, // image reference
  },
  {
    image: event1,
    EventName: "Friday Frenzy with Emma",
    EventCity: "Delhi, India",
    Date: "2024-08-23", // example date
    startTime: "20:00",
    endTime: "00:00",
    EventPrice: "₹400",
    Ticket: {
      Name: "Early Bird Ticket",
      Type: "Single Entry",
      TotalAvailableTickets: 200,
      TicketBrief: "Early bird access with discounted pricing.",
    },
    EventDescription: `Kick off your weekend with a bang at Friday Frenzy with Emma! This event in Delhi will feature thrilling performances, engaging entertainment, and a lively atmosphere. From start to finish, you'll be immersed in a high-energy environment with opportunities to dance, mingle, and enjoy. The early bird ticket offers a discount for those who act fast, so make sure to grab yours before they're gone. Join us for a night that promises excitement and fun, and make your Friday night memorable.`,
    TermsAndConditions: `1. Early bird tickets are limited and available on a first-come, first-served basis. 2. All sales are final; no refunds or exchanges. 3. The event is subject to change based on circumstances. 4. Attendees must comply with venue rules and regulations. 5. The organizer is not liable for any personal injury or loss.`,
    EventFlyer: event1, // image reference
  },
  {
    image: event2,
    EventName: "Wednesday Workshop with David",
    EventCity: "Bangalore, India",
    Date: "2024-08-28", // example date
    startTime: "15:00",
    endTime: "18:00",
    EventPrice: "₹200",
    Ticket: {
      Name: "Workshop Ticket",
      Type: "Single Entry",
      TotalAvailableTickets: 75,
      TicketBrief: "Access to workshop sessions and materials.",
    },
    EventDescription: `Join us for a Wednesday Workshop led by David in Bangalore. This event is designed for those looking to enhance their skills and knowledge through interactive sessions and expert guidance. The workshop will cover various topics with hands-on activities, providing valuable insights and practical takeaways. Don't miss this opportunity to learn from a seasoned professional and network with other participants. The ticket includes access to all sessions and workshop materials. Enhance your skills and advance your knowledge with this engaging workshop.`,
    TermsAndConditions: `1. Tickets are non-transferable and non-refundable. 2. All participants must register in advance. 3. The workshop content is subject to change. 4. Attendees should arrive on time and stay for the entire duration. 5. The organizer is not responsible for personal belongings.`,
    EventFlyer: event2, // image reference
  },
];

const EventPopup = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-lg relative">
        {/* Image Section */}
        <div className="w-full md:w-1/3 h-64 md:h-full overflow-hidden">
          <img
            src={event.image}
            alt={event.EventName}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/3 p-4 md:p-8 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-3xl md:text-4xl"
          >
            &times;
          </button>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {event.EventName}
          </h2>
          <div className="flex items-center mb-3 text-gray-700">
            <FaMapMarkerAlt className="mr-2 text-lg" />
            <span className="text-lg">{event.EventCity}</span>
          </div>
          <div className="flex items-center mb-4 text-gray-700">
            <FaClock className="mr-2 text-lg" />
            <span className="text-lg">{`${event.startTime} - ${event.endTime}`}</span>
          </div>
          <p className="mb-4 text-base md:text-lg">{event.EventDescription}</p>
          <div className="flex flex-col mb-4 space-y-2 text-base md:text-lg">
            <span className="font-semibold">Date:</span>
            <span>{event.Date}</span>
            <span className="font-semibold">Start Time:</span>
            <span>{event.startTime}</span>
            <span className="font-semibold">End Time:</span>
            <span>{event.endTime}</span>
            <span className="font-semibold">Price:</span>
            <span>{event.EventPrice}</span>
            <span className="font-semibold">Ticket:</span>
            <span>
              {event.Ticket.Name} ({event.Ticket.Type})
            </span>
            <span className="font-semibold">Available Tickets:</span>
            <span>{event.Ticket.TotalAvailableTickets}</span>
          </div>
          <p className="font-semibold text-lg">Terms and Conditions:</p>
          <p className="text-base md:text-lg">{event.TermsAndConditions}</p>
        </div>
      </div>
    </div>
  );
};

const AdminEvent = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleCardClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="p-5">
      <Link to="/admin/main/manage-events/1">
        <button className="bg-orange-500 text-white py-2 px-4 rounded-lg mb-5 mx-auto block">
          + Create New Event
        </button>
      </Link>
      <div className="flex flex-wrap gap-5">
        {events.map((event, index) => (
          <div
            className="bg-white border border-gray-300 rounded-lg shadow-md w-60 relative cursor-pointer"
            key={index}
            onClick={() => handleCardClick(event)}
          >
            <img
              src={event.image}
              alt={event.EventName}
              className="w-full rounded-t-lg"
            />
            <h2 className="font-bold text-lg p-3">{event.EventName}</h2>
            <div className="flex items-center p-3 text-gray-700">
              <FaMapMarkerAlt className="mr-2" />
              <span>{event.EventCity}</span>
            </div>
            <div className="flex items-center p-3 text-gray-700">
              <FaClock className="mr-2" />
              <span>{event.Date}</span>
            </div>
            <button
              className={`absolute bottom-4 right-4 w-4 h-4 rounded-full border-none cursor-pointer ${
                event.time === "Live Event" ? "bg-green-500" : "bg-red-500"
              }`}
            ></button>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center mt-10 space-x-4">
        <button className="bg-green-500 text-white py-2 px-6 rounded-lg">
          Live Event
        </button>
        <button className="bg-red-500 text-white py-2 px-6 rounded-lg">
          Paused Event
        </button>
      </div>
      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default AdminEvent;
