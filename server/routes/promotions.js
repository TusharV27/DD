const express = require("express");
const router = express.Router();
const Promotion = require("../Module/promotion");

// POST endpoint to add a promotion
router.post("/", async (req, res) => {
  try {
    const { subHeader, tagline, conditions, restaurantId, restaurantName } =
      req.body;
    console.log(req.body);
    const newPromotion = new Promotion({
      subHeader,
      tagline,
      conditions,
      restaurantId, // Add restaurantId
      isSuperAdminApprove: false,
      isLive: false,
      restaurantName,
    });
    await newPromotion.save();
    res.status(201).json(newPromotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET endpoint to retrieve all promotions
router.get("/", async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const promotions = await Promotion.find({ restaurantId: req.params.id });
    res.json(promotions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/approve/:id", async (req, res) => {
  try {
    // Find the promotion by its ID
    const promotion = await Promotion.findById(req.params.id);

    // Check if the promotion was found
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    // Toggle the isSuperAdminApprove property
    promotion.isSuperAdminApprove = !promotion.isSuperAdminApprove;

    // Save the updated promotion
    await promotion.save();

    // Return the updated promotion
    res.json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/reject/:id", async (req, res) => {
  try {
    // Find the promotion by its ID
    const promotion = await Promotion.findById(req.params.id);

    // Check if the promotion was found
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    // Toggle the isSuperAdminApprove property
    promotion.isSuperAdminApprove = false;
    promotion.isRejected = !promotion.isRejected;

    // Save the updated promotion
    await promotion.save();

    // Return the updated promotion
    res.json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/isLive/:id", async (req, res) => {
  try {
    // Find the promotion by its ID
    const promotion = await Promotion.findById(req.params.id);
    console.log(promotion);

    // Check if the promotion was found
    if (!promotion) {
      return res.status(404).json({ error: "Promotion not found" });
    }

    // Toggle the isSuperAdminApprove property
    promotion.isLive = !promotion.isLive;

    // Save the updated promotion
    await promotion.save();

    // Return the updated promotion
    res.json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
