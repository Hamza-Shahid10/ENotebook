import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/UserModel.js";

const router = express.Router();

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

export default router;
