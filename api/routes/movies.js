const router = require("express").Router();
const Movie = require("../models/Movie");

// Create
router.post("/", async (req, res) =>{
    const newMovie = new Movie(req.body);

    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get
router.get("/find/:id", async (req, res) =>{
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get Random
router.get("/random", async (req, res) =>{
    try {
        const movie = await Movie.aggregate([
            {$sample: {size: 1}}
        ])
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get All
router.get("/", async (req, res) =>{
    try {
        const movie = await Movie.find().sort({movieDate: -1});
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;