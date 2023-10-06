const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  cast: [String],
  genres: [String],
  href: String,
  extract: String,
  thumbnail: String,
  thumbnail_width: Number,
  thumbnail_height: Number,
});

const MovieModel = mongoose.model("movies", movieSchema);

module.exports = MovieModel;
