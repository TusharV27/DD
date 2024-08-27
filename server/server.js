// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import multer from "multer";
// import path from "path";
// import outletRoutes from "./routes/outlets.js";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const Outlet = require("./Module/outlet");
const OutletRoutes = require("./routes/outlets");
const SuperAdminRoutes = require("./routes/superAdmin");
const PromotionRoutes = require("./routes/promotions");

mongoose
  .connect(
    "mongodb+srv://tusharmegascale:tushar123@cluster0.xlfpxzg.mongodb.net/restDb"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function fetchOutlet() {
  const data = [
    {
      name: "Summer Menu",
      image: "https://example.com/images/summer-menu.jpg",
      category: [
        {
          name: "Beverages",
          subCategories: [
            {
              productName: "Iced Latte",
              description: "Chilled espresso with milk and ice.",
              allergen: ["Milk"],
              active: true,
              images: ["https://example.com/images/iced-latte.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "08:00 AM",
                endingTime: "08:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: false },
                ],
              },
            },
            {
              productName: "Lemonade",
              description: "Refreshing lemonade with a hint of mint.",
              allergen: [],
              active: true,
              images: ["https://example.com/images/lemonade.jpg"],
              setActiveTimings: {
                active: false,
                startingTime: null,
                endingTime: null,
              },
              setActiveDays: {
                active: false,
                days: [],
              },
            },
            {
              productName: "Smoothie",
              description:
                "Mixed fruit smoothie with a choice of berry or tropical flavors.",
              allergen: ["Berry"],
              active: true,
              images: ["https://example.com/images/smoothie.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "09:00 AM",
                endingTime: "06:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Cold Brew Coffee",
              description: "Smooth and strong cold brew coffee.",
              allergen: [],
              active: true,
              images: ["https://example.com/images/cold-brew-coffee.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "07:00 AM",
                endingTime: "07:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: false },
                ],
              },
            },
            {
              productName: "Herbal Tea",
              description: "Variety of herbal teas for relaxation.",
              allergen: [],
              active: true,
              images: ["https://example.com/images/herbal-tea.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "08:00 AM",
                endingTime: "06:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
          ],
        },
        {
          name: "Snacks",
          subCategories: [
            {
              productName: "Chips and Salsa",
              description: "Crispy chips with homemade salsa.",
              allergen: ["Tomato"],
              active: true,
              images: ["https://example.com/images/chips-salsa.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "10:00 AM",
                endingTime: "07:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Pretzels",
              description: "Salty and crunchy pretzels.",
              allergen: ["Wheat"],
              active: true,
              images: ["https://example.com/images/pretzels.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "11:00 AM",
                endingTime: "08:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Nachos",
              description: "Tortilla chips with melted cheese and toppings.",
              allergen: ["Cheese"],
              active: true,
              images: ["https://example.com/images/nachos.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "10:00 AM",
                endingTime: "09:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Fruit Salad",
              description: "Fresh seasonal fruits mixed together.",
              allergen: [],
              active: true,
              images: ["https://example.com/images/fruit-salad.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "09:00 AM",
                endingTime: "05:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Cheese Sticks",
              description:
                "Breaded and fried cheese sticks served with marinara.",
              allergen: ["Cheese", "Wheat"],
              active: true,
              images: ["https://example.com/images/cheese-sticks.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "11:00 AM",
                endingTime: "07:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Garlic Bread",
              description: "Toasted bread with garlic butter.",
              allergen: ["Wheat", "Butter"],
              active: true,
              images: ["https://example.com/images/garlic-bread.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "10:00 AM",
                endingTime: "08:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Mini Tacos",
              description:
                "Small tacos with beef or chicken and fresh toppings.",
              allergen: ["Wheat", "Dairy"],
              active: true,
              images: ["https://example.com/images/mini-tacos.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "11:00 AM",
                endingTime: "09:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Buffalo Wings",
              description: "Spicy chicken wings served with celery and ranch.",
              allergen: ["Chicken", "Dairy"],
              active: true,
              images: ["https://example.com/images/buffalo-wings.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "11:00 AM",
                endingTime: "09:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Mozzarella Sticks",
              description: "Fried mozzarella sticks with marinara sauce.",
              allergen: ["Cheese", "Wheat"],
              active: true,
              images: ["https://example.com/images/mozzarella-sticks.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "11:00 AM",
                endingTime: "08:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Spring Rolls",
              description:
                "Crispy vegetable spring rolls served with dipping sauce.",
              allergen: ["Soy"],
              active: true,
              images: ["https://example.com/images/spring-rolls.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "11:00 AM",
                endingTime: "08:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
          ],
        },
      ],
    },
    {
      name: "Summer Drink Menu",
      image: "https://example.com/images/summer-menu.jpg",
      category: [
        {
          name: "Beverages",
          subCategories: [
            {
              productName: "Iced Latte",
              description: "Chilled espresso with milk and ice.",
              allergen: ["Milk"],
              active: true,
              images: ["https://example.com/images/iced-latte.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "08:00 AM",
                endingTime: "08:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: false },
                ],
              },
            },
            {
              productName: "Lemonade",
              description: "Refreshing lemonade with a hint of mint.",
              allergen: [],
              active: true,
              images: ["https://example.com/images/lemonade.jpg"],
              setActiveTimings: {
                active: false,
                startingTime: null,
                endingTime: null,
              },
              setActiveDays: {
                active: false,
                days: [],
              },
            },
            {
              productName: "Smoothie",
              description:
                "Mixed fruit smoothie with a choice of berry or tropical flavors.",
              allergen: ["Berry"],
              active: true,
              images: ["https://example.com/images/smoothie.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "09:00 AM",
                endingTime: "06:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
            {
              productName: "Cold Brew Coffee",
              description: "Smooth and strong cold brew coffee.",
              allergen: [],
              active: true,
              images: ["https://example.com/images/cold-brew-coffee.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "07:00 AM",
                endingTime: "07:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: false },
                ],
              },
            },
            {
              productName: "Herbal Tea",
              description: "Variety of herbal teas for relaxation.",
              allergen: [],
              active: true,
              images: ["https://example.com/images/herbal-tea.jpg"],
              setActiveTimings: {
                active: true,
                startingTime: "08:00 AM",
                endingTime: "06:00 PM",
              },
              setActiveDays: {
                active: true,
                days: [
                  { day: "Monday", isOpen: true },
                  { day: "Tuesday", isOpen: true },
                  { day: "Wednesday", isOpen: true },
                  { day: "Thursday", isOpen: true },
                  { day: "Friday", isOpen: true },
                  { day: "Saturday", isOpen: true },
                  { day: "Sunday", isOpen: true },
                ],
              },
            },
          ],
        },
      ],
    },
  ];

  try {
    const outlet = await Outlet.findOne({ _id: "66b9da23f7866495e87029fd" });

    if (!outlet) {
      console.log("outlet not found");
    }
    console.log(outlet);
    outlet.menu.push(...data);

    await outlet.save();
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
}

app.get("/", (req, res) => {
  res.send(`<form action="/submit-visitor" method="POST">
    <label for="outletId">Outlet ID:</label>
    <input type="text" id="outletId" name="outletId" required><br><br>

    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob" required><br><br>

    <label for="mobileNumber">Mobile Number:</label>
    <input type="text" id="mobileNumber" name="mobileNumber" required><br><br>

    <button type="submit">Submit</button>
  </form>`);
});

app.use("/outlets", OutletRoutes);
app.use("/api/superadmin", SuperAdminRoutes);
app.use("/api/promotions", PromotionRoutes);
const menuRoutes = require("./routes/menu");
app.use("/api/menu", menuRoutes);

app.post("/api/visitor-response/:outletId", async (req, res) => {
  const { outletId } = req.params;
  const { mobileNumber, visitorDOB, visitingDateTime, accepted } = req.body;

  try {
    const outlet = await Outlet.findById(outletId);

    if (!outlet) {
      return res.status(404).send("Outlet not found");
    }

    // Add new visitor data
    const newVisitor = {
      visitorDOB,
      mobileNumber,
      visitingDateTime,
      isAccepted: accepted,
    };

    outlet.visitors.push(newVisitor);

    // Update noThanksCount if visitor clicked "No Thanks"
    if (!accepted) {
      outlet.noThanksCount += 1;
    }

    await outlet.save();

    res.status(200).send("Visitor data updated successfully");
  } catch (error) {
    console.error("Error updating visitor data:", error);
    res.status(500).send("Error updating visitor data");
  }
});

app.get("/api/visitor-data/:outletId", async (req, res) => {
  const { outletId } = req.params;

  try {
    const outlet = await Outlet.findById(outletId).select("visitors");
    if (!outlet) {
      return res.status(404).send("Outlet not found");
    }

    res.json(outlet.visitors);
  } catch (error) {
    console.error("Error fetching visitor data:", error);
    res.status(500).send("Error fetching visitor data");
  }
});

app.listen(5000, "0.0.0.0", () => console.log("Server started on port 5000"));
