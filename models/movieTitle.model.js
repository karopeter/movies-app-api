const mongoose = require('mongoose');


const movieTitleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a movie title"]
  },
  description: {
    type: String,
    required: [true, "Please provide a movie description"]
  },
  genre:{
    type: [String],
    required: [true, "Please provide a movie genre"],
  },
  releaseYear: {
    type: Number,
    required: [true, "Please provide a movie release year"]
  },
  cast: {
    type: [String],
    required: [true, "Please provide a movie case"]
  },
  duration: {
    type: String,
    required: [true, "Please provide movie duration"]
  },
  rating: {
    type: Number,
    required: [true, "Please provide a movie rating"]
  },
  postUrl: {
    type: String,
    required: [true, "Please provide a post url link"]
  },
  trailerUrl: {
    type: String,
    required: [true, "Please provide a trailer url link"]
  }
}, { timestamps: true});


const Movie = mongoose.model('Movie', movieTitleSchema);

module.exports = Movie;

