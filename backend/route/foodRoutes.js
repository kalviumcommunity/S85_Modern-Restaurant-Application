import express from "express";
import Food from "../model/Food.js";

const router = express.Router();

// Create a new food item (expects created_by field from client)
router.post("/", async (req, res) => {
  const { name, description, price, created_by } = req.body;
  try {
    const newFood = new Food({ name, description, price, created_by });
    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (err) {
    res.status(500).json({ message: "Error creating food item", error: err });
  }
});

// Get food items by user id
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const foods = await Food.find({ created_by: userId });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Error fetching foods", error: err });
  }
});

export default router;
