const express = require("express");
const router = express.Router();
const Outlet = require("../Module/outlet");

router.get("/outlets", async (req, res) => {
  try {
    const outlets = await Outlet.find({}, { _id: 1, restaurantName: 1 });
    res.status(200).json(outlets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/outlets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Find the outlet by ID
    const outlet = await Outlet.findById(id);

    // Check if the outlet was found
    if (!outlet) {
      return res.status(404).json({ message: "outlet not found" });
    }

    // Update the isActive status
    outlet.isActive = isActive;
    await outlet.save();

    // Respond with a success message
    res.json({ message: "Status updated successfully" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

router.post("/restaurants", async (req, res) => {
  try {
    console.log(req.body);
    const restaurant = new Outlet(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Outlet.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single restaurant by ID
router.get("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Outlet.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a restaurant by ID
router.put("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Outlet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a restaurant by ID
router.delete("/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Outlet.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
