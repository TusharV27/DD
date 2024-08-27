const express = require("express");
const router = express.Router();
const Outlet = require("../Module/outlet");
const Review = require("../Module/Review");

// Outlet Login
router.post("/login", async (req, res) => {
  try {
    const outlet = await Outlet.findOne({ email: req.body.email });
    if (!outlet) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    if (outlet.password !== req.body.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({
      _id: outlet._id,
      name: outlet.restaurantName,
      email: outlet.email,
      mobileNumber: outlet.mobileNumber,
      category: outlet.category,
      coverImage: outlet.coverImage,
      address: outlet.address,
      facilities: outlet.facilities,
      photos: outlet.photos,
      specialities: outlet.specialities,
      isActive: outlet.isActive,
      openDays: outlet.openDays,
      menu: outlet.menu,
      visitors: outlet.visitors,
      noThanksCount: outlet.noThanksCount,
      tnc: outlet.tnc,
      quote: outlet.quote,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/status/:id", async (req, res) => {
  try {
    const outlet = await Outlet.findById(req.params.id);
    if (!outlet) {
      return res.status(404).json({ error: "Outlet not found" });
    }
    res.status(200).json({ active: outlet.isActive });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new outlet
router.post("/", async (req, res) => {
  try {
    const outlet = new Outlet(req.body);
    const savedOutlet = await outlet.save();
    res.status(201).json(savedOutlet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all outlets
router.get("/", async (req, res) => {
  try {
    const outlets = await Outlet.find();
    res.status(200).json(outlets);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single outlet by ID
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const outlet = await Outlet.findById(req.params.id, {
      password: 0,
    });
    if (!outlet) return res.status(404).json({ error: "Outlet not found" });
    res.status(200).json(outlet);
    console.log(outlet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an outlet by ID
router.put("/:id", async (req, res) => {
  try {
    const outlet = await Outlet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!outlet) return res.status(404).json({ error: "Outlet not found" });
    res.status(200).json(outlet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an outlet by ID
router.delete("/:id", async (req, res) => {
  try {
    const outlet = await Outlet.findByIdAndDelete(req.params.id);
    if (!outlet) return res.status(404).json({ error: "Outlet not found" });
    res.status(200).json({ message: "Outlet deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/quote/:id", async (req, res) => {
  try {
    const outlet = await Outlet.findById(req.params.id);
    if (!outlet) return res.status(404).json({ error: "Outlet not found" });
    outlet.quote = req.body.quote;
    await outlet.save();
    res.status(200).json({ message: "Quote updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/tnc/:id", async (req, res) => {
  try {
    const outlet = await Outlet.findById(req.params.id);
    if (!outlet) return res.status(404).json({ error: "Outlet not found" });
    outlet.tnc = req.body.tnc.toString();
    console.log(outlet.tnc);
    await outlet.save();
    res.status(200).json({ message: "TNC updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/menu/:id", async (req, res) => {
  try {
    const outlet = await Outlet.findById(req.params.id);
    if (!outlet) return res.status(404).json({ error: "Outlet not found" });
    res.status(200).json(outlet.menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// API endpoint to post a review
router.post("/reviews", async (req, res) => {
  const { restaurantId, feedback, rating, username } = req.body;

  if (!restaurantId || !feedback || rating === undefined || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 1 and 5" });
  }

  try {
    const newReview = new Review({
      restaurantId,
      feedback,
      rating,
      username,
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: "Error saving review", error });
  }
});

router.get("/reviews/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const reviews = await Review.find({ restaurantId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
});

module.exports = router;
