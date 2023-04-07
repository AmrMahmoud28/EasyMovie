const router = require("express").Router();
const UserList = require("../models/UserList");

// Add
router.post("/add", async (req, res) =>{
    const newList = new UserList({
        userId: req.body.userId,
        movieId: req.body.movieId,
    });

    try {
        const savedList = await newList.save();
        res.status(201).json(savedList);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Delete
router.delete("/delete/:id", async (req, res) =>{
    try {
        await UserList.findByIdAndDelete(req.params.id);
        res.status(201).json("The movie has been removed");
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get
router.get("/:userId/:movieId", async (req, res) =>{
    try {
        const userMovie = await UserList.aggregate([
            {$match: {
                userId: req.params.userId,
                movieId: req.params.movieId,
            }}
        ])
        res.status(201).json(userMovie);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get All
router.get("/:userId", async (req, res) =>{
    try {
        const userMovie = await UserList.aggregate([
            {$match: {
                userId: req.params.userId,
            }}
        ])
        res.status(201).json(userMovie.reverse());
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;