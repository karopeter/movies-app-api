const express = require('express');
const MovieController = require("../controllers/movieController");
const Auth = require('../middleware/auth');
const router = express();

router.post("/create-movies", Auth.protect,  MovieController.createMovie);
router.get("/get-allmovies", Auth.protect,  MovieController.getAllMovies);
router.get("/getmovie/:id", Auth.protect,  MovieController.getMovieDetails);
router.put("/updatemovie/:id",  Auth.protect, MovieController.updateMovie);
router.delete("/deletemovie/:id", Auth.protect, MovieController.deleteMovie);

module.exports = router;