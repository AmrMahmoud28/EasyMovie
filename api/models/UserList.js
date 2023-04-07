const mongoose = require("mongoose");

const UserListSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    movieId: {type: String, required: true},
}, {timestamps: true});

module.exports = mongoose.model("UserList", UserListSchema)