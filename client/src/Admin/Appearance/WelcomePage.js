import "./Style.css";
import { IoMdClose, IoIosCall } from "react-icons/io";
import { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdRestaurantMenu } from "react-icons/md";
import axios from "axios";
import { apiUrl } from "../../Env/EnvExport";

const staticMenuData = [
  { _id: "1", name: "Burger" },
  { _id: "2", name: "Pizza" },
  { _id: "3", name: "Pasta" },
];

const staticQuote = "Atithi Devo Bhava (Guest is God)";

const staticTnc = [
  "Outside food is not allowed",
  "Carrying ticket is mandatory for an event",
  "Outside alcohol only allowed on BYOD days",
];

// const Appearance = ({ restaurantId, restaurantName, menu, quote, tnc }) => {
//   const [RestaurantId, setRestaurantId] = useState(restaurantId);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [refPage, setRefPage] = useState(false);
//   const [menuData, setMenuData] = useState(staticMenuData);
//   const [newFood, setNewFood] = useState("");
//   const [file, setFile] = useState(null); // New state for file
//   const [Quote, setQuote] = useState(quote);
//   const [editQuote, setEditQuote] = useState("");
//   const [editTnc, setEditTnc] = useState("");
//   const [restaurantTnc, setRestaurantTnc] = useState(tnc);

//   useEffect(() => {
//     setRefPage(!refPage);
//     console.log(tnc.split(",").map((item) => item.trim()));
//   }, []);

//   const handleAddItem = () => {
//     setShowModal(true);
//     setModalType("addItem");
//     setNewFood("");
//     setFile(null); // Reset file input
//   };

//   const handleImageChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setSelectedImage(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!newFood.trim() || !file) return;

//     const newItem = { _id: Date.now().toString(), name: newFood.trim() }; // Mock new item ID
//     setMenuData([...menuData, newItem]);
//     setRefPage(!refPage);
//     setNewFood("");
//     setFile(null);
//     setSelectedImage(null);
//     setShowModal(false);
//   };

//   const handleEditQuote = () => {
//     setEditQuote(quote);
//     setModalType("editQuote");
//     setShowModal(true);
//   };

//   const handleSaveQuote = (e) => {
//     e.preventDefault();
//     if (editQuote.trim()) {
//       setQuote(editQuote.trim());
//       axios
//         .post(`${apiUrl}/outlets/quote/${restaurantId}`, {
//           quote: editQuote.trim(),
//         })
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//       setRefPage(!refPage);
//       setShowModal(false);
//     }
//   };

//   const handleEditTnc = () => {
//     setEditTnc(restaurantTnc.map((item) => `• ${item}`).join("\n"));
//     setModalType("editTnc");
//     setShowModal(true);
//   };

//   const handleSaveTnc = (e) => {
//     e.preventDefault();
//     const updatedTnc = editTnc
//       .split("\n")
//       .map((item) => item.replace("• ", "").trim())
//       .filter((item) => item);

//     axios
//       .post(`${apiUrl}/outlets/tnc/${restaurantId}`, {
//         tnc: updatedTnc,
//       })
//       .then((response) => {
//         console.log(response.data);
//       });
//     setRestaurantTnc(updatedTnc);
//     setShowModal(false);
//   };

//   const handleDeleteItem = (id) => {
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete this item?`
//     );

//     if (confirmDelete) {
//       setMenuData(menuData.filter((item) => item._id !== id));
//       setRefPage(!refPage);
//     }
//   };

//   return (
//     <div className="p-5">
//       <div className="mt-5">
//         <div className="flex items-center mb-2">
//           <h2 className="font-bold text-xl">Menus</h2>
//         </div>
//         <div className="w-full md:w-[50%] flex flex-col items-start justify-center">
//           <div className="w-full">
//             {menuData.map((item) => (
//               <div key={item._id} className="ml-3 w-full">
//                 <div className=" flex items-center justify-between py-2 border-b-2 border-black border-dotted">
//                   <span>{item.name}</span>
//                   <button onClick={() => handleDeleteItem(item._id)}>
//                     <MdDelete className="text-[20px] text-red-500" />
//                   </button>
//                 </div>
//                 <hr className="border-none border-b border-gray-300 my-2" />
//               </div>
//             ))}
//           </div>
//           <div className="w-full flex items-center justify-center pr-10">
//             <button
//               className="flex items-center px-2 py-2 text-black rounded cursor-pointer"
//               onClick={handleAddItem}
//             >
//               <IoAddCircleOutline className="mr-2 text-xl" />
//               <span>Add Item</span>
//             </button>
//           </div>
//         </div>
//         <div className="w-full md:w-[50%]">
//           <div className="flex items-center mt-5">
//             <h2 className="font-bold text-xl">Quote</h2>
//             <FaEdit
//               className="ml-2 cursor-pointer text-[#757575]"
//               onClick={handleEditQuote}
//             />
//           </div>
//           <div className="mt-2 border-b-2 border-black border-dotted pb-3 mx-5 ml-3">
//             <p>{quote}</p>
//           </div>
//         </div>
//         <div className="flex items-center mt-5">
//           <h2 className="font-bold text-xl">Restaurant's T&C</h2>
//           <FaEdit
//             className="ml-2 cursor-pointer text-[#757575]"
//             onClick={handleEditTnc}
//           />
//         </div>
//         <div className="mt-2 mx-3">
//           {restaurantTnc.map((item, index) => (
//             <div key={index} className="flex items-center mb-2">
//               <span>&bull;</span>
//               <span className="ml-1">{item}</span>
//             </div>
//           ))}
//           <hr className="border-none border-b border-gray-300 my-2" />
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
//           <div className="bg-white p-5 rounded shadow-lg text-center w-full max-w-md relative">
//             <button
//               className="absolute top-3 right-3"
//               onClick={() => setShowModal(false)}
//             >
//               <IoMdClose className="text-xl" />
//             </button>
//             <h2 className="mb-5 font-semibold text-xl">
//               {modalType === "addItem" && "Add Food Item"}
//               {modalType === "editQuote" && "Edit Quote"}
//               {modalType === "editTnc" && "Edit Restaurant's T&C"}
//             </h2>
//             {modalType === "addItem" && (
//               <div className="w-full flex flex-col items-center">
//                 <form onSubmit={handleSubmit} className="w-full flex flex-col">
//                   <label className="mb-2 text-start">Poster Image</label>
//                   <div>
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 mb-3">
//                       <div className="flex flex-col items-center justify-center pt-1">
//                         {selectedImage ? (
//                           <img
//                             src={selectedImage}
//                             alt="Selected"
//                             className="w-full h-28 object-cover rounded-lg"
//                           />
//                         ) : (
//                           <>
//                             <svg
//                               className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                               xmlns="http://www.w3.org/2000/svg"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z"
//                               ></path>
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M8 11a4 4 0 118 0 4 4 0 01-8 0zm4 5h.01"
//                               ></path>
//                             </svg>
//                             <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
//                               Select a photo
//                             </p>
//                           </>
//                         )}
//                       </div>
//                       <input
//                         type="file"
//                         className="opacity-0"
//                         onChange={handleImageChange}
//                       />
//                     </label>
//                   </div>

//                   <label className="mb-2 text-start">Menu Name</label>
//                   <input
//                     type="text"
//                     value={newFood}
//                     onChange={(e) => setNewFood(e.target.value)}
//                     className="p-2 mb-5 w-full max-w-xs border border-gray-300 rounded"
//                   />
//                   <button
//                     type="submit"
//                     className="py-2 bg-blue-500 text-white rounded mb-2"
//                   >
//                     Save
//                   </button>
//                 </form>
//               </div>
//             )}

//             {modalType === "editQuote" && (
//               <form
//                 onSubmit={handleSaveQuote}
//                 className="flex flex-col items-center"
//               >
//                 <label className="mb-2">Quote</label>
//                 <input
//                   type="text"
//                   value={editQuote}
//                   onChange={(e) => setEditQuote(e.target.value)}
//                   className="p-2 mb-5 w-full max-w-xs border border-gray-300 rounded"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
//                 >
//                   Save
//                 </button>
//               </form>
//             )}
//             {modalType === "editTnc" && (
//               <form
//                 onSubmit={handleSaveTnc}
//                 className="flex flex-col items-center"
//               >
//                 <label className="mb-2">Restaurant's T&C</label>
//                 <textarea
//                   value={editTnc}
//                   onChange={(e) => setEditTnc(e.target.value)}
//                   rows="4"
//                   className="p-2 mb-5 w-full max-w-xs border border-gray-300 rounded"
//                 />
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
//                 >
//                   Save
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { MdDelete } from 'react-icons/md';
// import { IoAddCircleOutline, IoMdClose } from 'react-icons/io';
// import { FaEdit } from 'react-icons/fa';

const Appearance = ({ restaurantId, restaurantName, menu, quote, tnc }) => {
  const [RestaurantId, setRestaurantId] = useState(restaurantId);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [refPage, setRefPage] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [newFood, setNewFood] = useState("");
  const [file, setFile] = useState(null);
  const [Quote, setQuote] = useState(quote);
  const [editQuote, setEditQuote] = useState("");
  const [editTnc, setEditTnc] = useState(
    tnc
      ? tnc
      : "Outside food is not allowed,Carrying ticket is mandatory for an event,Outside alcohol only allowed on BYOD days"
  ); // Initialize as a comma-separated string

  useEffect(() => {
    setRefPage(!refPage);
    const id = JSON.parse(sessionStorage.getItem("restAdmin"));
    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/outlets/menu/${id._id}`);
        setMenuData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleAddItem = () => {
    setShowModal(true);
    setModalType("addItem");
    setNewFood("");
    setFile(null);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFood.trim() || !file) return;

    const newItem = { _id: Date.now().toString(), name: newFood.trim() };
    setMenuData([...menuData, newItem]);
    setRefPage(!refPage);
    setNewFood("");
    setFile(null);
    setSelectedImage(null);
    setShowModal(false);
  };

  const handleEditQuote = () => {
    setEditQuote(quote);
    setModalType("editQuote");
    setShowModal(true);
  };

  const handleSaveQuote = (e) => {
    e.preventDefault();
    if (editQuote.trim()) {
      setQuote(editQuote.trim());
      axios
        .post(`${apiUrl}/outlets/quote/${restaurantId}`, {
          quote: editQuote.trim(),
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setRefPage(!refPage);
      setShowModal(false);
    }
  };

  const handleEditTnc = () => {
    setEditTnc(
      tnc
        .split(",")
        .map((item) => item.trim())
        .join("\n")
    ); // Convert to a formatted string
    setModalType("editTnc");
    setShowModal(true);
  };

  const handleSaveTnc = (e) => {
    e.preventDefault();
    const updatedTnc = editTnc
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item)
      .join(", "); // Convert back to a comma-separated string

    axios
      .post(`${apiUrl}/outlets/tnc/${restaurantId}`, {
        tnc: updatedTnc,
      })
      .then((response) => {
        console.log(response.data);
      });
    setEditTnc(updatedTnc);
    setShowModal(false);
  };

  const handleDeleteItem = (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this item?`
    );

    if (confirmDelete) {
      setMenuData(menuData.filter((item) => item._id !== id));
      setRefPage(!refPage);
    }
  };

  return (
    <div className="p-5">
      <div className="mt-5">
        <div className="flex items-center mb-2">
          <h2 className="font-bold text-xl">Menus</h2>
        </div>
        <div className="w-full md:w-[50%] flex flex-col items-start justify-center">
          <div className="w-full">
            {menuData.map((item) => (
              <div key={item._id} className="ml-3 w-full">
                <div className=" flex items-center justify-between py-2 border-b-2 border-black border-dotted">
                  <span>{item.name}</span>
                  <button onClick={() => handleDeleteItem(item._id)}>
                    <MdDelete className="text-[20px] text-red-500" />
                  </button>
                </div>
                <hr className="border-none border-b border-gray-300 my-2" />
              </div>
            ))}
          </div>
          <div className="w-full flex items-center justify-center pr-10">
            <button
              className="flex items-center px-2 py-2 text-black rounded cursor-pointer"
              onClick={handleAddItem}
            >
              <IoAddCircleOutline className="mr-2 text-xl" />
              <span>Add Item</span>
            </button>
          </div>
        </div>
        <div className="w-full md:w-[50%]">
          <div className="flex items-center mt-5">
            <h2 className="font-bold text-xl">Quote</h2>
            <FaEdit
              className="ml-2 cursor-pointer text-[#757575]"
              onClick={handleEditQuote}
            />
          </div>
          <div className="mt-2 border-b-2 border-black border-dotted pb-3 mx-5 ml-3">
            <p>{quote}</p>
          </div>
        </div>
        <div className="flex items-center mt-5">
          <h2 className="font-bold text-xl">Restaurant's T&C</h2>
          <FaEdit
            className="ml-2 cursor-pointer text-[#757575]"
            onClick={handleEditTnc}
          />
        </div>
        <div className="mt-2 mx-3">
          {editTnc.split(",").map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <span>&bull;</span>
              <span className="ml-1">{item.trim()}</span>
            </div>
          ))}
          <hr className="border-none border-b border-gray-300 my-2" />
        </div>
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-5 rounded shadow-lg text-center w-full max-w-md relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose className="text-xl" />
            </button>
            <h2 className="mb-5 font-semibold text-xl">
              {modalType === "addItem" && "Add Food Item"}
              {modalType === "editQuote" && "Edit Quote"}
              {modalType === "editTnc" && "Edit Restaurant's T&C"}
            </h2>
            {modalType === "addItem" && (
              <div className="w-full flex flex-col items-center">
                <form onSubmit={handleSubmit} className="w-full flex flex-col">
                  <label className="mb-2 text-start">Poster Image</label>
                  <div>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-600 mb-3">
                      <div className="flex flex-col items-center justify-center pt-1">
                        {selectedImage ? (
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-full h-28 object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <svg
                              className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 7a4 4 0 014-4h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 11a4 4 0 118 0 4 4 0 01-8 0zm4 5h.01"
                              ></path>
                            </svg>
                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                              Select a photo
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        className="opacity-0"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  <label className="mb-2 text-start">Menu Name</label>
                  <input
                    type="text"
                    value={newFood}
                    onChange={(e) => setNewFood(e.target.value)}
                    className="p-2 mb-5 w-full max-w-xs border border-gray-300 rounded"
                  />
                  <button
                    type="submit"
                    className="py-2 bg-blue-500 text-white rounded mb-2"
                  >
                    Save
                  </button>
                </form>
              </div>
            )}

            {modalType === "editQuote" && (
              <form
                onSubmit={handleSaveQuote}
                className="flex flex-col items-center"
              >
                <label className="mb-2">Quote</label>
                <input
                  type="text"
                  value={editQuote}
                  onChange={(e) => setEditQuote(e.target.value)}
                  className="p-2 mb-5 w-full max-w-xs border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
                >
                  Save
                </button>
              </form>
            )}
            {modalType === "editTnc" && (
              <form
                onSubmit={handleSaveTnc}
                className="flex flex-col items-center"
              >
                <label className="mb-2">Restaurant's T&C</label>
                <textarea
                  value={editTnc}
                  onChange={(e) => setEditTnc(e.target.value)}
                  rows="4"
                  className="p-2 mb-5 w-full max-w-xs border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
                >
                  Save
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function List({ restaurantId, restaurantName, menu, quote, number }) {
  return (
    <body className="bg-white">
      <div className="max-w-sm mx-auto py-8 px-4">
        <h1 className="text-xl font-bold text-start text-zinc-900">
          Welcome to {restaurantName}
        </h1>
        <div className="text-black mt-4 flex items-center justify-center">
          <MdRestaurantMenu className="text-[18px]" />
          Choose your menu for today
        </div>
        <hr className="border border-black border-dashed mt-4" />
        <div className="mt-6">
          <div className="flex flex-col space-y-4">
            <div className="group relative">
              <img
                src="https://www.tastingtable.com/img/gallery/20-delicious-indian-dishes-you-have-to-try-at-least-once/intro-1645057933.webp"
                alt="Food"
                className="w-full h-auto rounded-lg brightness-50"
              />
              <h2 className="absolute mt-2 text-2xl font-semibold text-white bottom-3 left-4">
                Food
              </h2>
            </div>

            <div className="group relative">
              <img
                src="https://www.dev.carlosparnellmd.com/wp-content/uploads/2017/06/summer-food.jpeg"
                alt="Summer Menu"
                className="w-full h-auto rounded-lg brightness-50"
              />
              <h2 className="absolute mt-2 text-2xl font-semibold text-white bottom-3 left-4">
                Summer Menu
              </h2>
            </div>

            <div className="group relative">
              <img
                src="https://as1.ftcdn.net/v2/jpg/06/27/79/34/1000_F_627793462_UI9lLQsov6A56B1d5f0QSDEPjVqif3rv.jpg"
                alt="Alcohol"
                className="w-full h-auto rounded-lg brightness-50"
              />
              <h2 className="absolute mt-2 text-2xl font-semibold text-white bottom-3 left-4">
                Drink
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-black text-md italic">
            &quot;{quote ? quote : "Your Quote Here"}&quot;
          </p>
          <a
            href={`tel:${number}`}
            className="mt-4 text-black py-2 px-4 rounded-lg flex items-center justify-center"
          >
            <div className="text-red-400 font-bold me-2">Inquiry ?</div> Call us{" "}
            <IoIosCall className="ms-2 text-[20px]" />
          </a>
        </div>
      </div>
    </body>
  );
}

const Mobile_View = ({ restaurantId, restaurantName, menu, quote, number }) => {
  return (
    <div className="">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
        <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
          <div className="overflow-auto hide-scrollbar w-[272px] h-[572px]">
            <List
              restaurantId={restaurantId}
              restaurantName={restaurantName}
              menu={menu}
              quote={quote}
              number={number}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Welcome_Page Component
const Welcome_Page = () => {
  const [RestaurantName, setRestaurantName] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [number, setNumber] = useState("");
  const [quote, setQuote] = useState("");

  const [menu, setMenu] = useState([]);
  const [tnc, setTnc] = useState("");

  async function fetchOutlet() {}

  useEffect(() => {
    async function fetchData() {
      // alert("restaurantId");
      const data = JSON.parse(sessionStorage.getItem("restAdmin"));
      console.log(data);
      setRestaurantName(data.name);
      setRestaurantId(data._id);
      const response = await axios
        .get(`${apiUrl}/outlets/${data._id}`)
        .then((response) => {
          console.log(response.data);
          setMenu(response.data.menu);
          setTnc(response.data.tnc);
          setQuote(response.data.quote);
          setNumber(response.data.mobileNumber);
          setRestaurantName(response.data.name);
        });
    }
    fetchData();
    fetchOutlet();
  }, []);
  return (
    <div className="w-full h-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 w-full">
          <Appearance
            restaurantId={restaurantId}
            restaurantName={RestaurantName}
            menu={menu}
            quote={quote}
            number={number}
            tnc={tnc}
          />
        </div>
        <div className="lg:col-span-1 w-full relative min-h-[35rem] rounded-3xl overflow-hidden">
          <Mobile_View
            restaurantId={restaurantId}
            restaurantName={RestaurantName}
            menu={menu}
            quote={quote}
            number={number}
            tnc={tnc}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome_Page;
