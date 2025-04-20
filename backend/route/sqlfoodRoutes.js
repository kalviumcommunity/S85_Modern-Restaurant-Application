// routes/foodRoutes.js
import express from "express";
import Food from "../model/mysqlfood.js";  // Import Food model
import User from "../model/mysqluser.js";  // Import User model

const router = express.Router();

// Create a new food item (expects created_by field from client)
router.post("/", async (req, res) => {
  const { name, description, price, created_by } = req.body;
  try {
    const newFood = await Food.create({
      name,
      description,
      price,
      created_by,  // Save the foreign key
    });
    res.status(201).json(newFood);
  } catch (err) {
    res.status(500).json({ message: "Error creating food item", error: err.message });
  }
});

// Get food items by user ID (created_by)
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const foods = await Food.findAll({
      where: { created_by: userId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstname', 'lastName', 'email'], // You can adjust the fields you want to return
        },
      ],
    });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Error fetching foods", error: err.message });
  }
});

export default router;
