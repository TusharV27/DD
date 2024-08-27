const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
  subHeader: { type: String, required: true },
  tagline: { type: String, required: true },
  conditions: [{ type: String }],
  restaurantId: { type: String, required: true },
  restaurantName: { type: String, required: true },
  isLive: { type: Boolean, default: false },
  isSuperAdminApprove: { type: Boolean, default: false }, // Add isSuperAdminApprove
  isRejected: { type: Boolean, default: false },
});

module.exports = mongoose.model("Promotion", PromotionSchema);
