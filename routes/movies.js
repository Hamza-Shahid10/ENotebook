import express from "express";
import Movie from "../models/MoviesModel.js";

const router = express.Router();

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find().limit(20); // get first 20 movies
    res.status(201).json({
        message: "movies fetched succesfully",
        movies,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;