const router  = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const { json } = require("express");



router.post("/register", async (req,res)=> {
    
    const newUser = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password , process.env.PASSWORD_SECRET).toString()
            
        }
    );

    try {
        const addedUser = await newUser.save();

        res.status(201).send({"saved User": newUser});
    } catch (error) {
        res.status(500).send({"error while saving newUser ": error});
    }
})


router.post("/login" , async (req,res)=> {

    try {
        const user = await User.findOne({username: req.body.username});

        !user && res.status(401).json("Wrong credenttial!");


        const hashPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        ).toString(CryptoJS.enc.Utf8);

        hashPassword !== req.body.password && res.status(401).json("Wrong credenttial!");

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json("server error while login");
    }
})

module.exports = router;

