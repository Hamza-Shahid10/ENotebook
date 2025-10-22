import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({}, { strict: false });
const Movie = mongoose.model("movies", movieSchema); 

export default Movie;
