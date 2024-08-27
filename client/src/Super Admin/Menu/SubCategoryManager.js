import React, { useState, useEffect } from "react";
import axios from "axios";

const SubCategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newSubCategory, setNewSubCategory] = useState({
    productName: "",
    description: "",
    allergen: [],
    images: [],
  });
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [updatedSubCategory, setUpdatedSubCategory] = useState({
    ...newSubCategory,
  });

  useEffect(() => {
    // Fetch categories from the server
    axios
      .get("http://localhost:5000/api/categories") // Adjust endpoint as necessary
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreate = () => {
    if (selectedCategory) {
      axios
        .post(
          `http://localhost:5000/api/categories/${selectedCategory._id}/subcategories`,
          newSubCategory
        )
        .then((response) => {
          setSelectedCategory({
            ...selectedCategory,
            subCategories: [...selectedCategory.subCategories, response.data],
          });
          setNewSubCategory({
            productName: "",
            description: "",
            allergen: [],
            images: [],
          });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleUpdate = () => {
    if (selectedCategory && selectedSubCategory) {
      axios
        .put(
          `http://localhost:5000/api/categories/${selectedCategory._id}/subcategories/${selectedSubCategory._id}`,
          updatedSubCategory
        )
        .then((response) => {
          setSelectedCategory({
            ...selectedCategory,
            subCategories: selectedCategory.subCategories.map((subCat) =>
              subCat._id === response.data._id ? response.data : subCat
            ),
          });
          setSelectedSubCategory(null);
          setUpdatedSubCategory({ ...newSubCategory });
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = (subCatId) => {
    if (selectedCategory) {
      axios
        .delete(
          `http://localhost:5000/api/categories/${selectedCategory._id}/subcategories/${subCatId}`
        )
        .then(() => {
          setSelectedCategory({
            ...selectedCategory,
            subCategories: selectedCategory.subCategories.filter(
              (subCat) => subCat._id !== subCatId
            ),
          });
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SubCategory Manager</h1>

      {/* Category Selection */}
      <div className="mb-4">
        <select
          value={selectedCategory ? selectedCategory._id : ""}
          onChange={(e) => {
            const categoryId = e.target.value;
            const category = categories.find((cat) => cat._id === categoryId);
            setSelectedCategory(category);
          }}
          className="border p-2"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Form to create a new sub-category */}
      {selectedCategory && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 mr-2"
            value={newSubCategory.productName}
            onChange={(e) =>
              setNewSubCategory({
                ...newSubCategory,
                productName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 mr-2"
            value={newSubCategory.description}
            onChange={(e) =>
              setNewSubCategory({
                ...newSubCategory,
                description: e.target.value,
              })
            }
          />
          <button onClick={handleCreate} className="bg-blue-500 text-white p-2">
            Add SubCategory
          </button>
        </div>
      )}

      {/* Form to update a sub-category */}
      {selectedSubCategory && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Update Product Name"
            className="border p-2 mr-2"
            value={updatedSubCategory.productName}
            onChange={(e) =>
              setUpdatedSubCategory({
                ...updatedSubCategory,
                productName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Update Description"
            className="border p-2 mr-2"
            value={updatedSubCategory.description}
            onChange={(e) =>
              setUpdatedSubCategory({
                ...updatedSubCategory,
                description: e.target.value,
              })
            }
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white p-2"
          >
            Update SubCategory
          </button>
        </div>
      )}

      {/* Display sub-categories */}
      {selectedCategory && (
        <ul>
          {selectedCategory.subCategories.map((subCategory) => (
            <li
              key={subCategory._id}
              className="border-b p-2 flex justify-between items-center"
            >
              <span>{subCategory.productName}</span>
              <div>
                <button
                  onClick={() => {
                    setSelectedSubCategory(subCategory);
                    setUpdatedSubCategory(subCategory);
                  }}
                  className="bg-yellow-500 text-white p-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(subCategory._id)}
                  className="bg-red-500 text-white p-1"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubCategoryManager;
