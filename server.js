const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const  movieRoutes = require('./routes/movieRoutes');
const app = express();

const dotenv = require('dotenv');
dotenv.config();


const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
 .then(() => console.log('DB Connected Successfully...'))
 .catch((err) => console.log('Could not connected to DB. Please try again!', err));


app.use(express.json());

// Endpoints
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/movies", movieRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));