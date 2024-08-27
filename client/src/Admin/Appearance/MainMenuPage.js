import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../Env/EnvExport";

const ProductForm = ({ closeItemModal, categories }) => {
  // State hooks for input values
  // Initialize state with empty values or defaults
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [allergen, setAllergen] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [menuSection, setMenuSection] = useState(categories[0]?._id || ""); // Default to first category ID
  const [hasTimings, setHasTimings] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [activeDays, setActiveDays] = useState([]);
  const [images, setImages] = useState([]);

  // Function to handle the day button toggle
  const toggleDay = (day) => {
    setActiveDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day]
    );
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle remove image
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle success (e.g., close modal, show message, etc.)
    console.log("Product details:", {
      productName,
      description,
      allergen,
      isActive,
      menuSection,
      hasTimings,
      startTime,
      endTime,
      activeDays,
      images,
    });

    closeItemModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full sm:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Product Name</h2>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Margherita Pizza"
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />

          <h2 className="text-lg font-semibold mb-4">Product Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mention product description, please include nutritional information as well."
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
            rows="4"
          ></textarea>

          <h2 className="text-lg font-semibold mb-4">Allergen</h2>
          <input
            type="text"
            value={allergen}
            onChange={(e) => setAllergen(e.target.value)}
            placeholder="Wheat, Nuts"
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          />

          <div className="flex items-center mb-4">
            <label className="mr-2">Active</label>
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="toggle"
            />
          </div>

          <h2 className="text-lg font-semibold mb-4">Upload Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative border border-gray-300 rounded-md flex items-center justify-center"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                  className="rounded-md mb-2 max-w-full max-h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600 rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
            <div className="border border-dashed rounded-md flex items-center justify-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-blue-500 hover:underline"
              >
                Upload Product Images
              </label>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-4">Menu Section</h2>
          <select
            value={menuSection}
            onChange={(e) => setMenuSection(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-4"
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <h2 className="text-lg font-semibold mb-4">Set Active Timings</h2>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={hasTimings}
              onChange={() => setHasTimings(!hasTimings)}
              className="toggle mr-2"
            />
            <span>Active Timings</span>
          </div>
          {hasTimings && (
            <div className="flex mb-4">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mr-2"
              />
              <span className="self-center">To</span>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 rounded-md p-2 ml-2"
              />
            </div>
          )}

          <h2 className="text-lg font-semibold mb-4">Set Active Days</h2>
          <div className="flex flex-wrap mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`rounded-md p-2 m-1 ${
                  activeDays.includes(day)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={closeItemModal}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MainMenuPage = () => {
  // Static Data
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [restaurantId, setRestaurantId] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    const id = JSON.parse(sessionStorage.getItem("restAdmin"));

    async function fetchData() {
      try {
        const response = await axios.get(`${apiUrl}/outlets/menu/${id._id}`);
        const menuData = response.data;

        // Log response to debug
        console.log("Fetched menu data:", menuData);

        if (!menuData || !Array.isArray(menuData)) {
          console.error("Invalid menu data:", menuData);
          return;
        }

        // Transform data based on expected structure
        const categories = menuData.map((menu, index) => ({
          _id: menu._id,
          name: menu.name,
          subCategories: (menu.category || []).flatMap(
            (category) => category.subCategories || []
          ),
          category: (menu.category || []).flatMap((category) => category.name),
        }));
        console.log(menuData);
        console.log(categories[0]);

        // Set state with the fetched data
        setCategories(categories);
        setSubCategories(categories[0]?.category || []);
        setItems([]); // Clear items initially or set based on the first subCategory if needed
        setSelectedCategory(categories[0]?._id || "");
        setSelectedSubCategory(categories[0]?.subCategories[0]?.name || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    const selectedCat = categories.find((cat) => cat._id === category);
    setSelectedCategory(category);
    setSubCategories(selectedCat?.subCategories || []);
    console.log(selectedCat);
    setItems([]); // Reset items or fetch based on the subCategories
  };

  const handleSubCategoryClick = (subCategory) => {
    const selectedSubCat = subCategories.find(
      (sub) => sub.name === subCategory
    );
    console.log(selectedSubCat);
    setSelectedSubCategory(subCategory);
    setItems(selectedSubCat?.subCategory || []); // Populate items if available
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const handleSaveCategory = () => {
    setCategories([
      ...categories,
      { _id: Date.now().toString(), name: newCategoryName },
    ]);
    setNewCategoryName("");
    closeCategoryModal();
  };

  const openItemModal = () => {
    setIsItemModalOpen(true);
  };

  const closeItemModal = () => {
    setIsItemModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  console.log(selectedCategory, selectedSubCategory, selectedItem);
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <div className="bg-gray-200 p-2 mb-3 flex justify-between items-center">
            <h5 className="m-0 font-bold">Main Menu</h5>
          </div>
          {categories.map((category) => (
            <div
              className={`flex items-center border-2 py-2 px-2 mb-1 cursor-pointer ${
                category._id === selectedCategory
                  ? "bg-[#fcdfd7]"
                  : "bg-[#ffffff]"
              }`}
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
            >
              <span className="font-medium">{category.name}</span>
              <button className="ml-2 p-1 rounded">✏️</button>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-gray-200 p-2 mb-3 flex justify-between items-center">
            <h5 className="m-0 font-bold">Category</h5>
            <button
              className="bg-green-200 p-1 rounded"
              onClick={openCategoryModal}
            >
              Add +
            </button>
          </div>
          {subCategories.map((subCategory) => (
            <div
              className={`flex items-center border-2 py-2 px-2 mb-1 cursor-pointer ${
                subCategory === selectedSubCategory
                  ? "bg-[#fcdfd7]"
                  : "bg-[#ffffff]"
              }`}
              key={subCategory._id}
              onClick={() => handleSubCategoryClick(subCategory)}
            >
              <span className="font-medium">{subCategory}</span>
              <button className="ml-2 p-1 rounded">✏️</button>
            </div>
          ))}
        </div>

        <div>
          <div className="bg-gray-200 p-2 mb-3 flex justify-between items-center">
            <h5 className="m-0 font-bold">Sub Category</h5>
            <button
              className="bg-green-200 p-1 rounded"
              onClick={openItemModal}
            >
              Add +
            </button>
          </div>
          <div
            className={`flex items-center border-2 py-2 px-2 mb-1 cursor-pointer`}
          >
            <span className="font-medium">Mushroom Risotto</span>
            <button className="ml-2 p-1 rounded">✏️</button>
          </div>
          <div
            className={`flex items-center border-2 py-2 px-2 mb-1 cursor-pointer`}
          >
            <span className="font-medium">Margherita Pizza</span>
            <button className="ml-2 p-1 rounded">✏️</button>
          </div>
          <div
            className={`flex items-center border-2 py-2 px-2 mb-1 cursor-pointer`}
          >
            <span className="font-medium">Grilled Chicken Breast</span>
            <button className="ml-2 p-1 rounded">✏️</button>
          </div>
          {/* {items.map((item) => (
            <div
              className={`flex items-center border-2 py-2 px-2 mb-1 cursor-pointer ${
                item.name === selectedItem ? "bg-[#fcdfd7]" : "bg-[#ffffff]"
              }`}
              key={item.name}
              onClick={() => handleItemClick(item.name)}
            >
              <span className="font-medium">{item.name}</span>
              <button className="ml-2 p-1 rounded">✏️</button>
            </div>
          ))} */}
        </div>
      </div>

      {/* Modal for adding new category */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border rounded px-3 py-2 mb-4 w-full"
              placeholder="Category name"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSaveCategory}
                className="bg-green-200 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={closeCategoryModal}
                className="bg-red-200 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for adding new item */}
      {isItemModalOpen && (
        <ProductForm closeItemModal={closeItemModal} categories={categories} />
      )}
    </div>
  );
};

export default MainMenuPage;
