// import React, { useEffect, useState } from "react";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { FaRegEdit } from "react-icons/fa";
// import { apiUrl } from "../../Env/EnvExport";
// import axios from "axios";

// function MenuManager() {
//   const [outlets, setOutlets] = useState([]);
//   const [restoId, setRestoId] = useState("");
//   const [menus, setMenus] = useState([]);
//   const [selectedMenu, setSelectedMenu] = useState("");
//   const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
//   const [subCategories, setSubCategories] = useState([]);
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await axios.get(`${apiUrl}/api/superadmin/outlets`);
//         console.log(res.data);
//         setRestoId(res.data[0]._id);
//         setOutlets(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchData();
//   }, []);

//   async function handleShowMenu() {
//     try {
//       const res = await axios.get(
//         `${apiUrl}/api/menu/restaurants/${restoId}/menus`
//       );
//       console.log(res.data);
//       if (res.data.length === 0) {
//         setMenus([]);
//         setCategories([]);
//         setSubCategories([]);
//       } else {
//         setMenus(res.data);
//         setSelectedMenu(res.data[0]._id);
//         setCategories(res.data[0].category);
//         setSelectedCategory(res.data[0].category[0]._id);
//         setSubCategories(res.data[0].category[0].subCategories);
//         setSelectedSubCategory(res.data[0].category[0].subCategories[0]._id);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   async function handleClickMenu(id) {
//     setSelectedMenu(id);
//     let index = menus.findIndex((menu) => menu._id === id);
//     setSelectedMenuIndex(index);
//     console.log(menus[index].category);
//     setCategories(menus[index].category);
//   }
//   async function handleClickCategories(id) {
//     setSelectedCategory(id);
//     let index = categories.findIndex((menu) => menu._id === id);
//     setSelectedCategoryIndex(index);
//     console.log(categories[index].subCategories);
//     setSubCategories(categories[index].subCategories);
//   }
//   async function handleClickSubCategories(id) {
//     setSelectedSubCategory(id);
//     // let index = categories.findIndex((menu) => menu._id === id);
//     // setSelectedCategoryIndex(index);
//     // console.log(categories[index].subCategories);
//     // setSubCategories(categories[index].subCategories);
//   }

//   return (
//     <div className="p-6 w-full bg-white border-2">
//       <h1 className="text-2xl font-bold mb-4 text-gray-800">Menu Manager</h1>
//       <div className="mb-4">
//         <label
//           htmlFor="outlet"
//           className="block text-gray-700 font-medium mb-2"
//         >
//           Select Outlet
//         </label>
//         <select
//           name="outlet"
//           id="outlet"
//           value={restoId}
//           onChange={(e) => setRestoId(e.target.value)}
//           className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {outlets.map((outlet) => (
//             <option key={outlet._id} value={outlet._id}>
//               {outlet.restaurantName}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button
//         onClick={() => handleShowMenu()}
//         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//       >
//         Show Menu
//       </button>
//       <div>
//         <h1>Menu</h1>
//         <div className="grid grid-cols-3 gap-4">
//           <div className="bg-gray-100 h-auto w-full border-2">
//             <div
//               className={`py-4 mb-5 px-2 text-[19px] flex items-center justify-between border-b-2 border-black bg-[#ffd3c7]`}
//             >
//               <h1>Main Menu</h1>
//               <button>
//                 <IoIosAddCircleOutline className="text-[25px] text-green-600 " />
//               </button>
//             </div>
//             <div className="px-3 ">
//               {menus.length > 0 ? (
//                 menus.map((menu) => (
//                   <div
//                     className={`py-4 mb-2 px-2 text-[19px] ${
//                       menu._id === selectedMenu
//                         ? "bg-orange-300"
//                         : "bg-slate-300"
//                     } flex items-center justify-between rounded-lg `}
//                     key={menu._id}
//                     onClick={() => handleClickMenu(menu._id)}
//                   >
//                     <h1>{menu.name}</h1>
//                     <button>Edit</button>
//                   </div>
//                 ))
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//           <div className="bg-gray-100 h-auto w-full">
//             <div
//               className={`py-4 mb-2 px-2 text-[19px] flex items-center justify-between border-b-2 border-black`}
//             >
//               <h1>Category</h1>
//               <button>Edit</button>
//             </div>
//             <div>
//               {categories.length > 0 ? (
//                 categories.map((menu) => (
//                   <div
//                     className={`py-4 mb-2 px-2 text-[19px] ${
//                       menu._id === selectedCategory
//                         ? "bg-orange-300"
//                         : "bg-slate-300"
//                     } flex items-center justify-between `}
//                     key={menu._id}
//                     onClick={() => handleClickCategories(menu._id)}
//                   >
//                     <h1>{menu.name}</h1>
//                     <button>Edit</button>
//                   </div>
//                 ))
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//           <div className="bg-gray-100 h-auto w-full">
//             <div
//               className={`py-4 mb-2 px-2 text-[19px] flex items-center justify-between border-b-2 border-black`}
//             >
//               <h1>Subcategory</h1>
//               <button>Edit</button>
//             </div>
//             <div>
//               {subCategories.length > 0 ? (
//                 subCategories.map((menu) => (
//                   <div
//                     className={`py-4 mb-2 px-2 text-[19px] ${
//                       menu._id === selectedSubCategory
//                         ? "bg-orange-300"
//                         : "bg-slate-300"
//                     } flex items-center justify-between `}
//                     key={menu._id}
//                     onClick={() => handleClickSubCategories(menu._id)}
//                   >
//                     <h1>{menu.productName}</h1>
//                     <button>Edit</button>
//                   </div>
//                 ))
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MenuManager;

import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { apiUrl } from "../../Env/EnvExport";
import axios from "axios";

function MenuManager() {
  const [outlets, setOutlets] = useState([]);
  const [restoId, setRestoId] = useState("");
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCatModalOpen, setCatIsModalOpen] = useState(false);
  const [isEditCatModalOpen, setIsEditCatModalOpen] = useState(false);
  const [isSubCatModalOpen, setSubCatIsModalOpen] = useState(false);
  const [isEditSubCatModalOpen, setIsEditSubCatModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
  });
  const [formDataCat, setFormDataCat] = useState({
    name: "",
  });
  const [formDataSubCat, setFormDataSubCat] = useState({
    name: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${apiUrl}/api/superadmin/outlets`);
        setRestoId(res.data[0]._id);
        setOutlets(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  async function handleShowMenu() {
    try {
      const res = await axios.get(
        `${apiUrl}/api/menu/restaurants/${restoId}/menus`
      );
      if (res.data.length === 0) {
        setMenus([]);
        setCategories([]);
        setSubCategories([]);
      } else {
        setMenus(res.data);
        setSelectedMenu(res.data[0]._id);
        setCategories(res.data[0].category);
        setSelectedCategory(res.data[0].category[0]._id);
        setSubCategories(res.data[0].category[0].subCategories);
        setSelectedSubCategory(res.data[0].category[0].subCategories[0]._id);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleClickMenu(id) {
    setSelectedMenu(id);
    let index = menus.findIndex((menu) => menu._id === id);
    setSelectedMenuIndex(index);
    console.log(menus[index].category);
    setCategories(menus[index].category);
  }
  async function handleClickCategories(id) {
    setSelectedCategory(id);
    let index = categories.findIndex((menu) => menu._id === id);
    setSelectedCategoryIndex(index);
    console.log(categories[index].subCategories);
    setSubCategories(categories[index].subCategories);
  }
  async function handleClickSubCategories(id) {
    setSelectedSubCategory(id);
    // let index = categories.findIndex((menu) => menu._id === id);
    // setSelectedCategoryIndex(index);
    // console.log(categories[index].subCategories);
    // setSubCategories(categories[index].subCategories);
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData.image);

    const data = new FormData();
    data.append("name", formData.name); // Replace `menuName` with your actual name value
    data.append("image", formData.image); // Replace `selectedImageFile` with your actual file object

    axios
      .post(`${apiUrl}/api/menu/restaurants/${restoId}/menus`, data)
      .then((response) => {
        console.log("Menu saved:", response.data);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error saving menu:", error);
      });
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }
  // edit

  function handleEditMenu(id, name, image, menu) {
    console.log(id);
    // console.log(name);
    // console.log(image);
    // console.log(menu);
    setIsEditModalOpen(true);
    setImagePreview(image);
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: name,
      image: image,
    }));
  }

  function handleEditModalClose() {
    setIsEditModalOpen(false);
  }

  return (
    <div className="p-4 sm:p-6 w-full bg-white border-2">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">
        Menu Manager
      </h1>
      <div className="mb-4">
        <label
          htmlFor="outlet"
          className="block text-gray-700 font-medium mb-2"
        >
          Select Outlet
        </label>
        <select
          name="outlet"
          id="outlet"
          value={restoId}
          onChange={(e) => setRestoId(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {outlets.map((outlet) => (
            <option key={outlet._id} value={outlet._id}>
              {outlet.restaurantName}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={() => handleShowMenu()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Show Menu
      </button>
      <div className="mt-4">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-100 h-auto w-full border-2">
            <div className="py-4 mb-5 px-2 text-lg sm:text-xl flex items-center justify-between border-b-2 border-black bg-[#ffd3c7]">
              <h2>Main Menu</h2>
              <button onClick={() => setIsModalOpen(true)}>
                <IoIosAddCircleOutline className="text-xl sm:text-2xl text-green-600" />
              </button>
            </div>
            <div className="px-2 sm:px-3">
              {menus.length > 0 ? (
                menus.map((menu) => (
                  <div
                    className={`py-4 mb-2 px-2 text-lg ${
                      menu._id === selectedMenu
                        ? "bg-orange-300"
                        : "bg-slate-300"
                    } flex items-center justify-between rounded-lg cursor-pointer`}
                    key={menu._id}
                    onClick={() => handleClickMenu(menu._id)}
                  >
                    <h2>{menu.name}</h2>
                    <button
                      onClick={() =>
                        handleEditMenu(menu._id, menu.name, menu.image, menu)
                      }
                    >
                      Edit
                    </button>
                  </div>
                ))
              ) : (
                <p>No menus available</p>
              )}
            </div>
          </div>
          {/* Edit Menu */}
          <>
            {isEditModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                  <h3 className="text-lg font-bold mb-4">Add New Menu</h3>
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Menu Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full p-2 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="block text-gray-700 font-medium mb-2"
                      >
                        Image
                      </label>
                      {imagePreview && (
                        <div className="mt-2">
                          <img
                            src={`data:image/png;base64,${imagePreview}`}
                            alt="Preview"
                            className="w-full h-auto border border-gray-300 rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        </div>
      </div>

      {/* Modal for Adding Menu */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Menu</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Menu Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className="block w-full p-2 border border-gray-300 rounded-lg"
                  accept="image/*"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-auto border border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuManager;

{
  /* <div className="bg-gray-100 h-auto w-full">
<div
  className={`py-4 mb-2 px-2 text-[19px] flex items-center justify-between border-b-2 border-black`}
>
  <h1>Category</h1>
  <button>Edit</button>
</div>
<div>
  {categories.length > 0 ? (
    categories.map((menu) => (
      <div
        className={`py-4 mb-2 px-2 text-[19px] ${
          menu._id === selectedCategory
            ? "bg-orange-300"
            : "bg-slate-300"
        } flex items-center justify-between `}
        key={menu._id}
        onClick={() => handleClickCategories(menu._id)}
      >
        <h1>{menu.name}</h1>
        <button>Edit</button>
      </div>
    ))
  ) : (
    <></>
  )}
</div>
</div>
<div className="bg-gray-100 h-auto w-full">
<div
  className={`py-4 mb-2 px-2 text-[19px] flex items-center justify-between border-b-2 border-black`}
>
  <h1>Subcategory</h1>
  <button>Edit</button>
</div>
<div>
  {subCategories.length > 0 ? (
    subCategories.map((menu) => (
      <div
        className={`py-4 mb-2 px-2 text-[19px] ${
          menu._id === selectedSubCategory
            ? "bg-orange-300"
            : "bg-slate-300"
        } flex items-center justify-between `}
        key={menu._id}
        onClick={() => handleClickSubCategories(menu._id)}
      >
        <h1>{menu.productName}</h1>
        <button>Edit</button>
      </div>
    ))
  ) : (
    <></>
  )}
</div>
</div> */
}
