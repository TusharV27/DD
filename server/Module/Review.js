// Review.js
const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    restaurantId: { type: String, required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
