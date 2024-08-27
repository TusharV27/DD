const express = require("express");
const router = express.Router();
const Restaurant = require("../Module/outlet");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });

// Add a menu to a restaurant
// router.post("/restaurants/:restaurantId/menus", async (req, res) => {
//   try {
//     const restaurant = await Restaurant.findById(req.params.restaurantId);
//     if (!restaurant) {
//       return res.status(404).json({ error: "Restaurant not found" });
//     }
//     const newMenu = req.body;
//     restaurant.menu.push(newMenu);
//     await restaurant.save();
//     res.status(201).json(restaurant);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// router.post(
//   "/restaurants/:restaurantId/menus",
//   upload.single("image"), // 'image' is the field name in the form
//   async (req, res) => {
//     // console.log(req.body.name);
//     try {
//       const restaurant = await Restaurant.findById(req.params.restaurantId);
//       // console.log(restaurant);
//       if (!restaurant) {
//         return res.status(404).json({ error: "Restaurant not found" });
//       }

//       const { name } = req.body;
//       let imageBase64 = null;

//       // Convert image to base64 if provided
//       if (req.file) {
//         const imageBuffer = req.file.buffer;
//         imageBase64 = imageBuffer.toString("base64");
//         // console.log(imageBase64);
//       }

//       const newMenu = {
//         name,
//         image: imageBase64,
//       };

//       restaurant.menu.push(newMenu);
//       await restaurant.save();
//       res.status(201).json(restaurant);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   }
// );

router.post(
  "/restaurants/:restaurantId/menus",
  upload.single("image"), // 'image' is the field name in the form
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      const { name } = req.body;
      let imageBase64 = null;

      if (req.file) {
        const imageBuffer = req.file.buffer;
        imageBase64 = imageBuffer.toString("base64");
      }

      // Check for duplicate menu name
      const existingMenu = restaurant.menu.find((menu) => menu.name === name);
      if (existingMenu) {
        return res
          .status(400)
          .json({ error: "Menu item with this name already exists" });
      }

      const newMenu = {
        name,
        image: imageBase64,
      };

      restaurant.menu.push(newMenu);
      await restaurant.save();
      res.status(201).json(restaurant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Read all menus for a restaurant
router.get("/restaurants/:restaurantId/menus", async (req, res) => {
  console.log(req.params.restaurantId);
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant.menu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a menu in a restaurant
router.put("/restaurants/:restaurantId/menus/:menuId", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    const menu = restaurant.menu.id(req.params.menuId);
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    Object.assign(menu, req.body);
    await restaurant.save();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a menu from a restaurant
router.delete("/restaurants/:restaurantId/menus/:menuId", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    const initialLength = restaurant.menu.length;
    restaurant.menu = restaurant.menu.filter(
      (menu) => !menu._id.equals(req.params.menuId)
    );
    if (restaurant.menu.length === initialLength) {
      return res.status(404).json({ error: "Menu not found" });
    }
    await restaurant.save();
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD Routes for Category

// Add a category to a specific menu
router.post(
  "/restaurants/:restaurantId/menus/:menuId/categories",
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      const menu = restaurant.menu.id(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }

      const { name } = req.body;
      if (menu.categories.some((cat) => cat.name === name)) {
        return res.status(400).json({ error: "Category already exists" });
      }

      const newCategory = { ...req.body };
      menu.categories.push(newCategory);
      await restaurant.save();

      res.status(201).json(menu);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Read all categories for a specific menu
router.get(
  "/restaurants/:restaurantId/menus/:menuId/categories",
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      const menu = restaurant.menu.id(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }

      res.status(200).json(menu.categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update a category in a specific menu
router.put(
  "/restaurants/:restaurantId/menus/:menuId/categories/:categoryId",
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      const menu = restaurant.menu.id(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }

      const category = menu.categories.id(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      Object.assign(category, req.body);
      await restaurant.save();

      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete a category from a specific menu
router.delete(
  "/restaurants/:restaurantId/menus/:menuId/categories/:categoryId",
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      const menu = restaurant.menu.id(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }

      const initialLength = menu.categories.length;
      menu.categories = menu.categories.filter(
        (category) => !category._id.equals(req.params.categoryId)
      );

      if (menu.categories.length === initialLength) {
        return res.status(404).json({ error: "Category not found" });
      }

      await restaurant.save();
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// sub category

router.post(
  "/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/subcategories",
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      const menu = restaurant.menu.id(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }
      const category = menu.categories.id(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const newSubcategory = { ...req.body };
      category.subcategories.push(newSubcategory);
      await restaurant.save();
      res.status(201).json(restaurant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Read all subcategories for a category
router.get(
  "/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/subcategories",
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      const menu = restaurant.menu.id(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }
      const category = menu.categories.id(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(200).json(category.subcategories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update a subcategory
router.put(
  "/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/subcategories/:subcategoryId",
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      const menu = restaurant.menu.id(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }
      const category = menu.categories.id(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const subcategory = category.subcategories.id(req.params.subcategoryId);
      if (!subcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
      Object.assign(subcategory, req.body);
      await restaurant.save();
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Delete a subcategory
router.delete(
  "/restaurants/:restaurantId/menus/:menuId/categories/:categoryId/subcategories/:subcategoryId",
  async (req, res) => {
    try {
      const restaurant = await Restaurant.findById(req.params.restaurantId);
      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
      const menu = restaurant.menu.id(req.params.menuId);
      if (!menu) {
        return res.status(404).json({ error: "Menu not found" });
      }
      const category = menu.categories.id(req.params.categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      const initialLength = category.subcategories.length;
      category.subcategories = category.subcategories.filter(
        (subcategory) => !subcategory._id.equals(req.params.subcategoryId)
      );
      if (category.subcategories.length === initialLength) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
      await restaurant.save();
      res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
