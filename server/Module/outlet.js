const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the subCategory schema
const subCategorySchema = new Schema({
  productName: { type: String, required: true },
  description: { type: String },
  allergen: { type: [String] }, // Array of allergens
  active: { type: Boolean, default: true },
  images: { type: [String] }, // Array of image URLs
  setActiveTimings: {
    active: { type: Boolean, default: true },
    startingTime: { type: String }, // e.g., "10:00 AM"
    endingTime: { type: String }, // e.g., "10:00 PM"
  },
  setActiveDays: {
    active: { type: Boolean, default: true },
    days: [
      {
        day: {
          type: String,
          enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        isOpen: { type: Boolean, default: false },
      },
    ],
  },
});

const categorySchema = new Schema({
  name: { type: String, required: true },
  subCategories: [subCategorySchema], // Array of subCategorySchema
});

// Define the menu schema
const menuSchema = new Schema({
  name: { type: String, required: true }, // Ensure menu name is unique
  image: { type: String },
  category: [categorySchema],
});

const visitorSchema = new Schema(
  {
    visitorDOB: {
      type: Date,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    visitingDateTime: {
      type: Date,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      default: true, // true means the visitor accepted, false means "No Thanks"
    },
  },
  { timestamps: true }
);

const outletSchema = new Schema(
  {
    coverImage: { type: String },
    restaurantName: { type: String, required: true },
    specialities: { type: [String] },
    address: { type: String },
    facilities: { type: [Object] },
    photos: { type: [String] },
    openDays: [
      {
        day: {
          type: String,
          enum: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        },
        isOpen: { type: Boolean, default: false },
        openingTime: { type: String },
        closingTime: { type: String },
      },
    ],
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: {
      type: Array,
    },
    menu: [menuSchema],
    isActive: { type: Boolean, default: true },
    visitors: [visitorSchema],
    noThanksCount: { type: Number, default: 0 }, // New field to count "No Thanks" visitors
    quote: { type: String },
    tnc: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Outlet", outletSchema);
