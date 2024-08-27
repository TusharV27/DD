import React, { useState } from "react";
import Img1 from "./event1.jpg";
import Img2 from "./event2.jpg";
import Img3 from "./event1.jpg";
import Img4 from "./event2.jpg";

export default function SuperAdminEvent() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Wine Tasting",
      restaurantName: "Dining Dots",
      location: "41, 5th Avenue, New York",
      city: "New York",
      date: "2024-08-15",
      startTime: "18:00",
      endTime: "22:00",
      price: "$150",
      flyer: Img1,
      isApproved: true,
      isLive: true,
      tickets: [
        {
          name: "General Admission",
          type: "Standard",
          available: 50,
          brief: "Access to event",
        },
      ],
      description:
        "An evening of fine wines and gourmet food. An evening of fine wines and gourmet food. An evening of fine wines and gourmet food. An evening of fine wines and gourmet food. An evening of fine wines and gourmet food. An evening of fine wines and gourmet food. An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.An evening of fine wines and gourmet food.",
      terms: "No refunds after purchase. ",
    },
    {
      id: 2,
      name: "Live Jazz Night",
      city: "Los Angeles",
      date: "2024-08-20",
      startTime: "20:00",
      endTime: "23:00",
      price: "$75",
      flyer: Img2,
      tickets: [
        {
          name: "VIP",
          type: "Premium",
          available: 20,
          brief: "Front row seats and free drinks",
        },
        {
          name: "General Admission",
          type: "Standard",
          available: 100,
          brief: "Standard seats",
        },
      ],
      description: "Enjoy live jazz music with a special dinner menu.",
      terms: "No outside food or drink allowed.",
    },
    {
      id: 3,
      name: "Art Exhibition",
      city: "San Francisco",
      date: "2024-09-05",
      startTime: "10:00",
      endTime: "18:00",
      price: "$50",
      flyer: Img3,
      tickets: [
        {
          name: "Early Bird",
          type: "Standard",
          available: 30,
          brief: "Early access to the exhibition",
        },
        {
          name: "General Admission",
          type: "Standard",
          available: 150,
          brief: "Access to all exhibits",
        },
      ],
      description: "Explore contemporary art from emerging artists.",
      terms: "Tickets are non-refundable.",
    },
    {
      id: 4,
      name: "Food Festival",
      city: "Chicago",
      date: "2024-10-10",
      startTime: "12:00",
      endTime: "20:00",
      price: "$40",
      flyer: Img4,
      tickets: [
        {
          name: "Food Lover",
          type: "Standard",
          available: 200,
          brief: "Unlimited food samples",
        },
        {
          name: "VIP",
          type: "Premium",
          available: 50,
          brief: "VIP area with exclusive food items",
        },
      ],
      description: "A day filled with delicious food from around the world.",
      terms: "No outside food or drink allowed.",
    },
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <section>
        <div className="min-h-screen bg-gray-100">
          <main className="p-8">
            <section className="mb-12">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                Events Approval
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events
                  .filter((event) => new Date(event.date) >= new Date())
                  .map((event) => (
                    <div
                      key={event.id}
                      className="bg-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl relative"
                    >
                      <img
                        src={event.flyer}
                        alt={event.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-2xl font-bold mb-2">{event.name}</h3>
                      <p className="text-gray-600 mb-2">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-700 mb-4">
                        {event.description.slice(0, 45)}
                      </p>
                      <div className="flex justify-between items-center">
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                          onClick={() => handleOpenModal(event)}
                        >
                          View
                        </button>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                            Approve
                          </button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </main>
        </div>
      </section>

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative overflow-hidden">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <div className="max-h-[80vh] overflow-y-auto">
              <img
                src={selectedEvent.flyer}
                alt={selectedEvent.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-3xl font-bold mb-2">{selectedEvent.name}</h3>
              <p className="text-gray-600 mb-2">City: {selectedEvent.city}</p>
              <p className="text-gray-600 mb-2">
                Date: {new Date(selectedEvent.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">
                Start Time: {selectedEvent.startTime}
              </p>
              <p className="text-gray-600 mb-2">
                End Time: {selectedEvent.endTime}
              </p>
              <p className="text-gray-600 mb-2">Price: {selectedEvent.price}</p>
              <h4 className="text-xl font-semibold mb-2">Tickets:</h4>
              <ul className="list-disc pl-5 mb-4">
                {selectedEvent.tickets.map((ticket, index) => (
                  <li key={index}>
                    {ticket.name} ({ticket.type}) - Available:{" "}
                    {ticket.available}
                    <br />
                    Brief: {ticket.brief}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 mb-4">{selectedEvent.description}</p>
              <p className="text-gray-600 mb-4">
                Terms and Conditions: {selectedEvent.terms}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
