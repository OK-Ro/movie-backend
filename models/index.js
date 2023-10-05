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
  cast: [
    {
      type: String,
    },
  ],
  genres: [
    {
      type: String,
    },
  ],
  href: {
    type: String,
  },
  extract: {
    type: String,
  },
  thumbnail: {
    url: String,
  },
  thumbnail_width: {
    type: Number,
  },
  thumbnail_height: {
    type: Number,
  },
});

const MovieModel = mongoose.model("Movie", movieSchema);

module.exports = MovieModel;
