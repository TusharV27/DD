const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the ticket schema
const ticketSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  available: { type: Number, required: true },
  brief: { type: String },
});

// Define the main event schema
const eventSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  restaurantName: { type: String },
  location: { type: String },
  city: { type: String },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  price: { type: String, required: true },
  flyer: { type: String }, // Assuming Img1 is a URL or identifier for the image
  isApproved: { type: Boolean, default: false },
  isLive: { type: Boolean, default: false },
  tickets: [ticketSchema],
  description: { type: String, required: true },
  terms: { type: String },
});

// Create the model
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
