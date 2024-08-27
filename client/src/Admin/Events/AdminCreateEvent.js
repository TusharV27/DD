// import React, { useState } from "react";
// import { FaUpload } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const AdminCreateEvent = () => {
//   const [image, setImage] = useState(null);
//   const [eventDate, setEventDate] = useState("");
//   const [eventStartTime, setEventStartTime] = useState("10:00 PM");
//   const [eventEndTime, setEventEndTime] = useState("12:00 PM");
//   const navigate = useNavigate();

//   const handleImageUpload = (e) => {
//     setImage(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleDragDropClick = () => {
//     document.getElementById("file").click();
//   };

//   const handleNextClick = (e) => {
//     e.preventDefault();
//     navigate("/admin/main/manage-events/2");
//   };

//   const handleBackClick = (e) => {
//     e.preventDefault(); // Prevents the default action of the event

//     // Show a confirmation prompt
//     const userConfirmed = window.confirm("Are you sure you want to go back?");

//     // If the user confirms, navigate to the desired path
//     if (userConfirmed) {
//       navigate("/admin/main/manage-events/0");
//     }
//   };

//   return (
//     <div className="p-4 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-gray-800 font-medium">Basic Info</span>
//           <span className="flex-grow h-1 bg-gray-300"></span>
//           <span className="text-gray-400">Tickets</span>
//           <span className="flex-grow h-1 bg-gray-300"></span>
//           <span className="text-gray-400">Description</span>
//           <span className="flex-grow h-1 bg-gray-300"></span>
//           <span className="text-gray-400">Review</span>
//         </div>
//       </div>
// <div>
//       <div className="text-center mb-8">
//         <input
//           type="file"
//           id="file"
//           onChange={handleImageUpload}
//           className="hidden"
//         />
//         <label htmlFor="file" className="inline-block w-full cursor-pointer">
//           <div
//             className="border-2 border-dashed border-blue-400 p-4 rounded-lg flex flex-col items-center justify-center mx-auto w-40 h-40"
//             onClick={handleDragDropClick}
//           >
//             {image ? (
//               <img
//                 src={image}
//                 alt="Event Flyer"
//                 className="w-24 h-24 object-cover"
//               />
//             ) : (
//               <>
//                 <FaUpload size={48} className="text-blue-400" />
//                 <p className="mt-2 text-gray-600">Drag and Drop here</p>
//                 <button
//                   type="button"
//                   className="bg-blue-300 text-white px-3 py-1 rounded mt-2"
//                   onClick={handleDragDropClick}
//                 >
//                   Browse File
//                 </button>
//               </>
//             )}
//           </div>
//         </label>
//         <button
//           className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded mt-4"
//           onClick={() => alert("Image Uploaded!")}
//         >
//           Upload
//         </button>
//       </div>

//       <form>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Event Name</label>
//           <input
//             type="text"
//             placeholder="Event Name"
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Event City</label>
//           <select className="w-full p-2 border border-gray-300 rounded">
//             <option value="Mumbai">Mumbai</option>
//             <option value="Pune">Pune</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Bangalore">Bangalore</option>
//           </select>
//         </div>
//         <div className="flex flex-wrap -mx-2 mb-4">
//           <div className="w-full sm:w-1/3 px-2 mb-4">
//             <label className="block text-gray-700 mb-2">Event Date</label>
//             <input
//               type="date"
//               value={eventDate}
//               onChange={(e) => setEventDate(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="w-full sm:w-1/3 px-2 mb-4">
//             <label className="block text-gray-700 mb-2">Event Start Time</label>
//             <select
//               value={eventStartTime}
//               onChange={(e) => setEventStartTime(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="10:00 PM">10:00 PM</option>
//               <option value="11:00 PM">11:00 PM</option>
//               <option value="12:00 AM">12:00 AM</option>
//             </select>
//           </div>
//           <div className="w-full sm:w-1/3 px-2 mb-4">
//             <label className="block text-gray-700 mb-2">Event End Time</label>
//             <select
//               value={eventEndTime}
//               onChange={(e) => setEventEndTime(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//             >
//               <option value="12:00 PM">12:00 PM</option>
//               <option value="1:00 AM">1:00 AM</option>
//               <option value="2:00 AM">2:00 AM</option>
//             </select>
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Event Price</label>
//           <input
//             type="number"
//             placeholder="₹"
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div className="flex justify-between mt-6">
//           <button
//             type="button"
//             className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
//             onClick={handleBackClick}
//           >
//             Back
//           </button>
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded"
//             onClick={handleNextClick}
//           >
//             Next
//           </button>
//         </div>
//       </form>
//       </div>
//     </div>
//   );
// };

// export default AdminCreateEvent;

import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

function AdminCreateEvent() {
  const [image, setImage] = useState(null);
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("10:00 PM");
  const [eventEndTime, setEventEndTime] = useState("12:00 PM");

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleDragDropClick = () => {
    document.getElementById("file").click();
  };
  return (
    <div>
      <div>
        <div className="text-center mb-8">
          <input
            type="file"
            id="file"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label htmlFor="file" className="inline-block w-full cursor-pointer">
            <div
              className="border-2 border-dashed border-blue-400 p-4 rounded-lg flex flex-col items-center justify-center mx-auto w-40 h-40"
              onClick={handleDragDropClick}
            >
              {image ? (
                <img
                  src={image}
                  alt="Event Flyer"
                  className="w-24 h-24 object-cover"
                />
              ) : (
                <>
                  <FaUpload size={48} className="text-blue-400" />
                  <p className="mt-2 text-gray-600">Drag and Drop here</p>
                  <button
                    type="button"
                    className="bg-blue-300 text-white px-3 py-1 rounded mt-2"
                    onClick={handleDragDropClick}
                  >
                    Browse File
                  </button>
                </>
              )}
            </div>
          </label>
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded mt-4"
            onClick={() => alert("Image Uploaded!")}
          >
            Upload
          </button>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              placeholder="Event Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Event City</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
          <div className="flex flex-wrap -mx-2 mb-4">
            <div className="w-full sm:w-1/3 px-2 mb-4">
              <label className="block text-gray-700 mb-2">Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-full sm:w-1/3 px-2 mb-4">
              <label className="block text-gray-700 mb-2">
                Event Start Time
              </label>
              <select
                value={eventStartTime}
                onChange={(e) => setEventStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="10:00 PM">10:00 PM</option>
                <option value="11:00 PM">11:00 PM</option>
                <option value="12:00 AM">12:00 AM</option>
              </select>
            </div>
            <div className="w-full sm:w-1/3 px-2 mb-4">
              <label className="block text-gray-700 mb-2">Event End Time</label>
              <select
                value={eventEndTime}
                onChange={(e) => setEventEndTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 AM">1:00 AM</option>
                <option value="2:00 AM">2:00 AM</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Event Price</label>
            <input
              type="number"
              placeholder="₹"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminCreateEvent;
