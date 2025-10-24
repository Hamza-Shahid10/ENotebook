import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/UserModel.js";

const router = express.Router();

//Add User to Mongo
router.post(
  "/create-user",
  [
    body("name").isLength({ min: 4 }).withMessage("Name must be at least 4 chars"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Password too short"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      console.log(req.body);

      const user = await User.create(req.body);

      res.status(201).json({
        message: "User added successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

//Get All Users
router.get("/fetch-all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ SINGLE USER BY ID
router.get("/fetch-user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(201).json({
      message: "User Fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ UPDATE USER
router.put("/update-user/:id", [
  body("name").isLength({ min: 4 }).withMessage("Name must be at least 4 chars"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password too short"),
], async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(201).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ DELETE USER
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
