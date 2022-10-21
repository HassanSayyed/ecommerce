const router  = require("express").Router();


router.get("/usertest" , (req,res)=> {
    res.send("ok from user ");
})


module.exports = router;

