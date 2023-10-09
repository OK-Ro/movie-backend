const express = require("express");
const MovieModel = require("../models/index");
const router = express.Router();

// Route to create one or multiple movies
router.post("/movies", async (req, res) => {
  try {
    const movieData = req.body;
    const moviesToCreate = Array.isArray(movieData) ? movieData : [movieData];

    const createdMovies = [];
    const skippedMovies = [];

    for (const data of moviesToCreate) {
      const existingMovie = await MovieModel.findOne({
        title: data.title,
      });

      if (existingMovie) {
        skippedMovies.push(existingMovie);
      } else {
        const newMovieData = {
          title: data.title,
          year: data.year,
          cast: data.cast,
          genres: data.genres,
          href: data.href,
          extract: data.extract,
          thumbnail: data.thumbnail,
          thumbnail_width: data.thumbnail_width,
          thumbnail_height: data.thumbnail_height,
        };

        const newMovie = new MovieModel(newMovieData);
        const savedMovie = await newMovie.save();
        createdMovies.push(savedMovie);
      }
    }

    let message = `${createdMovies.length} movie(s) created successfully`;
    if (skippedMovies.length > 0) {
      message += ` (${skippedMovies.length} movie(s) skipped due to existence)`;
    }

    res.status(201).json({
      message,
      createdMovies,
      skippedMovies,
    });
  } catch (error) {
    console.error("Error creating movies:", error);
    res
      .status(500)
      .json({ message: "Unable to create movies", error: error.message });
  }
});

// Route to retrieve all movies
router.get("/movies", async (req, res) => {
  try {
    const allMovies = await MovieModel.find();
    res.status(200).json({
      message: "All movies retrieved successfully.",
      movies: allMovies,
    });
  } catch (error) {
    console.error("Error retrieving movies:", error);
    res.status(500).json({
      message: "Unable to retrieve movies",
      error: error.message,
    });
  }
});

// Route to search for movies by title, genre, year, or cast
router.get("/movies/search", async (req, res) => {
  try {
    console.log("Received a search request");

    const { title, genre, year, cast } = req.query;
    console.log("Query Parameters:", req.query);

    const query = {};

    if (title) {
      query.title = { $regex: new RegExp(title, "i") };
    }

    if (genre) {
      query.genres = genre;
    }

    if (year) {
      query.year = year;
    }

    if (cast) {
      query.cast = cast;
    }

    console.log("Constructed Query:", query);

    const movies = await MovieModel.find(query);

    console.log("Found Movies:", movies);

    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error searching for movies:", error);
    res
      .status(500)
      .json({ message: "Unable to search for movies", error: error.message });
  }
});
// Route to get all comedy movies
router.get("/movies/comedy", async (req, res) => {
  try {
    const comedyMovies = await MovieModel.find({
      genres: "Comedy",
    });

    res.status(200).json(comedyMovies);
  } catch (error) {
    console.error("Error retrieving comedy movies:", error);
    res.status(500).json({
      message: "Unable to retrieve comedy movies",
      error: error.message,
    });
  }
});

// Route to get Drama movies
router.get("/movies/drama", async (req, res) => {
  try {
    const dramaMovies = await MovieModel.find({
      genres: "Drama",
    });
    res.status(200).json({ movies: dramaMovies });
  } catch (error) {
    console.error("Error getting Drama movies:", error);
    res.status(500).json({
      message: "Unable to retrieve Drama movies",
      error: error.message,
    });
  }
});

// Route to get Sports movies
router.get("/movies/sports", async (req, res) => {
  try {
    const sportsMovies = await MovieModel.find({
      genres: "Sports",
    });
    res.status(200).json({ movies: sportsMovies });
  } catch (error) {
    console.error("Error getting Sports movies:", error);
    res.status(500).json({
      message: "Unable to retrieve Sports movies",
      error: error.message,
    });
  }
});

// Route to get Science Fiction movies
router.get("/movies/science-fiction", async (req, res) => {
  try {
    const scienceFictionMovies = await MovieModel.find({
      genres: "Science Fiction",
    });
    res.status(200).json({ movies: scienceFictionMovies });
  } catch (error) {
    console.error("Error getting Science Fiction movies:", error);
    res.status(500).json({
      message: "Unable to retrieve Science Fiction movies",
      error: error.message,
    });
  }
});

// Route to get all Adventure movies
router.get("/movies/Adventure", async (req, res) => {
  try {
    const adventureMovies = await MovieModel.find({
      genres: "Adventure",
    });

    res.status(200).json({ movies: adventureMovies });
  } catch (error) {
    console.error("Error fetching Adventure movies:", error);
    res.status(500).json({
      message: "Unable to fetch Adventure movies",
      error: error.message,
    });
  }
});

// Route to retrieve movie details by ID
router.get("/movies/:id/information", async (req, res) => {
  try {
    const movieId = req.params.id;

    const movieDetails = await MovieModel.findById(movieId);

    if (!movieDetails) {
      return res.status(404).json({
        message: "Movie details not found.",
      });
    }

    res.status(200).json({
      message: "Movie details retrieved successfully.",
      details: movieDetails,
    });
  } catch (error) {
    console.error("Error retrieving movie details:", error);
    res.status(500).json({
      message: "Unable to retrieve movie details",
      error: error.message,
    });
  }
});
// Route to get Action movies
router.get("/movies/action", async (req, res) => {
  try {
    const actionMovies = await MovieModel.find({ genres: "Action" });

    res.status(200).json({
      message: "Action movies retrieved successfully.",
      movies: actionMovies,
    });
  } catch (error) {
    console.error("Error retrieving Action movies:", error);
    res.status(500).json({
      message: "Unable to retrieve Action movies",
      error: error.message,
    });
  }
});
// Route to get Animated movies
router.get("/movies/animated", async (req, res) => {
  try {
    const animatedMovies = await MovieModel.find({ genres: "Animated" });

    res.status(200).json({
      message: "Animated movies retrieved successfully.",
      movies: animatedMovies,
    });
  } catch (error) {
    console.error("Error retrieving Animated movies:", error);
    res.status(500).json({
      message: "Unable to retrieve Animated movies",
      error: error.message,
    });
  }
});

// Route to get Horror and Thriller movies
router.get("/movies/horrorthriller", async (req, res) => {
  try {
    const horrorThrillerMovies = await MovieModel.find({
      genres: { $in: ["Horror", "Thriller"] },
    });

    res.status(200).json({
      message: "Horror and Thriller movies retrieved successfully.",
      movies: horrorThrillerMovies,
    });
  } catch (error) {
    console.error("Error retrieving Horror and Thriller movies:", error);
    res.status(500).json({
      message: "Unable to retrieve Horror and Thriller movies",
      error: error.message,
    });
  }
});

// Route to get Romance movies
router.get("/movies/romance", async (req, res) => {
  try {
    const romanceMovies = await MovieModel.find({ genres: "Romance" });

    res.status(200).json({
      message: "Romance movies retrieved successfully.",
      movies: romanceMovies,
    });
  } catch (error) {
    console.error("Error retrieving Romance movies:", error);
    res.status(500).json({
      message: "Unable to retrieve Romance movies",
      error: error.message,
    });
  }
});

// Route to delete a movie by ID
router.delete("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    const deletedMovie = await MovieModel.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(200).json({
      message: "Movie deleted successfully.",
      deletedMovie,
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res
      .status(500)
      .json({ message: "Unable to delete movie", error: error.message });
  }
});

// Route to delete all movies
router.delete("/movies", async (req, res) => {
  try {
    console.log("DELETE /api/movies endpoint reached");

    const deletedMovies = await MovieModel.deleteMany({});

    if (deletedMovies.deletedCount === 0) {
      return res.status(404).json({ message: "No movies found to delete." });
    }

    res.status(200).json({
      message: "All movies deleted successfully.",
      deletedMovies,
    });
  } catch (error) {
    console.error("Error deleting all movies:", error);
    res
      .status(500)
      .json({ message: "Unable to delete all movies", error: error.message });
  }
});

// Route to update a movie by ID
router.put("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const updatedMovieData = req.body;

    console.log("Updating movie with ID:", movieId);

    const existingMovie = await MovieModel.findById(movieId);

    if (!existingMovie) {
      console.log("Movie not found with ID:", movieId);
      return res.status(404).json({ message: "Movie not found." });
    }

    const updatedMovie = await MovieModel.findByIdAndUpdate(
      movieId,
      updatedMovieData,
      { new: true }
    );

    console.log("Movie updated successfully:", updatedMovie);

    res.status(200).json({
      message: "Movie updated successfully.",
      updatedMovie,
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    res
      .status(500)
      .json({ message: "Unable to update movie", error: error.message });
  }
});

// Route to retrieve the latest movies
router.get("/movies/latest", async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 20;

    const latestMovies = await MovieModel.find()
      .sort({ releaseDate: -1 })
      .limit(count);

    res.status(200).json({
      message: "Latest movies retrieved successfully.",
      movies: latestMovies,
    });
  } catch (error) {
    console.error("Error retrieving latest movies:", error);
    res.status(500).json({
      message: "Unable to retrieve latest movies",
      error: error.message,
    });
  }
});

// Route to retrieve detailed information about a specific movie by ID
router.get("/movies/:id", async (req, res) => {
  try {
    const movieId = req.params.id;

    const movie = await MovieModel.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    res.status(200).json({
      message: "Movie retrieved successfully.",
      movie,
    });
  } catch (error) {
    console.error("Error retrieving movie:", error);
    res.status(500).json({
      message: "Unable to retrieve movie",
      error: error.message,
    });
  }
});

// Route to get Action movies
router.get("/movies/action", async (req, res) => {
  try {
    const actionMovies = await MovieModel.find({ genres: "Action" });

    res.status(200).json({
      message: "Action movies retrieved successfully.",
      movies: actionMovies,
    });
  } catch (error) {
    console.error("Error retrieving Action movies:", error);
    res.status(500).json({
      message: "Unable to retrieve Action movies",
      error: error.message,
    });
  }
});

module.exports = router;
