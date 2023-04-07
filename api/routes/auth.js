const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");

// Register
router.post("/register", async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});


// Login
router.post("/login", async (req, res) =>{
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(401).json("Wrong password or username!");
            return;
        }

        const bytes = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJs.enc.Utf8);

        if(originalPassword !== req.body.password ){
            res.status(401).json("Wrong password or username!");
            return;
        }

        const {password, ...info} = user._doc;
 
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;