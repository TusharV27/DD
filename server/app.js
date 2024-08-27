const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  allergen: { type: String },
  active: { type: Boolean, default: true },
  activeTimings: {
    from: { type: String }, // e.g., "10:00 AM"
    to: { type: String }, // e.g., "10:00 PM"
  },
  activeDays: [{ type: String }], // e.g., ["Monday", "Tuesday"]
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategories: [subcategorySchema],
});

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  categories: [categorySchema],
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  menu: [menuSchema],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

const app = express();
const port = 3004; // Port for your server

mongoose.connect("mongodb://localhost:27017/restaurantdb").then(() => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(bodyParser.json());

// Create a new restaurant
app.post("/restaurants", async (req, res) => {
  try {
    console.log(req.body);
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all restaurants
app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single restaurant by ID
app.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a restaurant by ID
app.put("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a restaurant by ID
app.delete("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a menu to a restaurant
app.post("/restaurants/:restaurantId/menus", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    const newMenu = req.body;
    restaurant.menu.push(newMenu);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all menus for a restaurant
app.get("/restaurants/:restaurantId/menus", async (req, res) => {
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
app.put("/restaurants/:restaurantId/menus/:menuId", async (req, res) => {
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
app.delete("/restaurants/:restaurantId/menus/:menuId", async (req, res) => {
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
app.post(
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
app.get(
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
app.put(
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
app.delete(
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

app.post(
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
app.get(
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
app.put(
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
app.delete(
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
