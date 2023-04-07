const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const movieRoute = require("./routes/movies");
const usersListRoute = require("./routes/userslist");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch(error => console.log(error));

app.use(express.json());
app.use(cors({origin: 'https://easymovie.netlify.app'}));

app.use("/api/auth", authRoute);
app.use("/api/movie", movieRoute);
app.use("/api/user-list", usersListRoute);

app.listen(process.env.PORT || 8800, () =>{
    console.log("Backend server is running!");
});