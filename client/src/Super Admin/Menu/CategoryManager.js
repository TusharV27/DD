import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");

  useEffect(() => {
    // Fetch categories from the server
    axios
      .get("http://localhost:5000/api/categories") // Adjust endpoint as necessary
      .then((response) => setCategories(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreate = () => {
    axios
      .post("http://localhost:5000/api/categories", { name: newCategory })
      .then((response) => {
        setCategories([...categories, response.data]);
        setNewCategory("");
      })
      .catch((error) => console.error(error));
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:5000/api/categories/${selectedCategory._id}`, {
        name: updatedCategoryName,
      })
      .then((response) => {
        setCategories(
          categories.map((cat) =>
            cat._id === response.data._id ? response.data : cat
          )
        );
        setSelectedCategory(null);
        setUpdatedCategoryName("");
      })
      .catch((error) => console.error(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => {
        setCategories(categories.filter((cat) => cat._id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category Manager</h1>

      {/* Form to create a new category */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="New Category Name"
          className="border p-2 mr-2"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleCreate} className="bg-blue-500 text-white p-2">
          Add Category
        </button>
      </div>

      {/* Form to update a category */}
      {selectedCategory && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Update Category Name"
            className="border p-2 mr-2"
            value={updatedCategoryName}
            onChange={(e) => setUpdatedCategoryName(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white p-2"
          >
            Update Category
          </button>
        </div>
      )}

      {/* Display categories */}
      <ul>
        {categories.map((category) => (
          <li
            key={category._id}
            className="border-b p-2 flex justify-between items-center"
          >
            <span>{category.name}</span>
            <div>
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setUpdatedCategoryName(category.name);
                }}
                className="bg-yellow-500 text-white p-1 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="bg-red-500 text-white p-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
