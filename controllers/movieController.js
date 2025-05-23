const Movie = require('../models/movieTitle.model');


exports.createMovie = async (req, res, next) => {
   try {
    const {
    title,
    description,
    genre,
    releaseYear,
    cast,
    duration,
    rating,
    postUrl,
    trailerUrl
  } = req.body;

  // Check if movie already exists 
  const existingMovie = await Movie.findOne({ title });

  if (existingMovie) {
      return next(new Error('Movie already exists', 400));
  }
  // Create a new movie 
  const newMovie = new Movie({
    title,
    description,
    genre,
    releaseYear,
    cast,
    duration,
    rating,
    postUrl,
    trailerUrl
  });

 
  const saveMovie = await newMovie.save();

  res.status(201).json({
    message: "Movie Created Successfully",
    movie: saveMovie
  }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: movies.length,
      movies
    });
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}

exports.getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);

    // if a movies doesn't exist on the db, we should throw an error message 
    if (!movie) {
      return res.status(404).json({ error: "Movie not found"});
    }

    res.status(200).json({
      success: true,
      movie
    });
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}

exports.updateMovie = async (req, res, next) => {
  try {
   const { id } = req.params;

   const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
   });

   if (!updatedMovie) {
    return res.status(404).json({ error: "Movie not found"});
   }

   res.status(200).json({
    success: true,
    message: "Movie updated successfully",
    movie: updatedMovie
   });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
},

exports.deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return res.status(404).json({ error: "Movie Not Found"});
    }

    res.status(200).json({
      success: true,
      message: "Movie Deleted Successfully"
    });
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}










