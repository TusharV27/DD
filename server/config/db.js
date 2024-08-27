const mongoose = require("mongoose");

// MongoDB connection URI
const mongoURI =
  "mongodb+srv://tusharmegascale:tushar123@cluster0.xlfpxzg.mongodb.net/restDb";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
