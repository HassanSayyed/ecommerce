const router  = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");



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

         if(!user) return res.status(401).json("user not found!");


        const hashPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET
        );

        const originalPassword = hashPassword.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password) return res.status(401).json("Wrong password!");

        const acessToken = jwt.sign({
            id:      user.id,
            isAdmin: user.isAdmin
        },
            process.env.JWT_SECRET,
            {expiresIn: "15d"}
        );

        const {password, ...others} = user._doc ;

        res.status(200).json({...others, acessToken});

    } catch (error) {
        res.status(500).json("server error while login");
    }
})

module.exports = router;

