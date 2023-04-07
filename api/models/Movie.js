const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    movieName: {type: String, required: true, unique: true},
    movieOverview: {type: String},
    movieGenre: {type: String},
    movieLimit: {type: String},
    movieRating: {type: String},
    movieDuration: {type: String},
    movieDate: {type: String},

    movieBg: {type: String},
    moviePoster: {type: String},

    movieTrailer: {type: String},
    movieVideo: {type: String},
}, {timestamps: true});

module.exports = mongoose.model("Movie", MovieSchema)