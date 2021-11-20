const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const Post = require("../models/post.model");
const authanticate = require("../middleware/authanticate");
const  authorize  = require("../middleware/authorize");


router.post("/addFollowing", authanticate, async function (req, res) {

    try {
        let followId = req.body.followId;
      
        for (let i = 0; i < req.user.following.length; i++){ 
            if (req.user.following[i] == followId) {
               return res.status(400).send("User is already follow this person");
            }
        }
        let user = await User.findByIdAndUpdate(req.user.id, {$push: {
          following: {
          $each: [ followId ],
       }}},{
            new: true
        }).lean().exec();
        res.status(200).json({user:user});
    } catch (err) {
         res.status(400).json({error: err.message});
    }
});

router.post("/unFollowing", authanticate, async function (req, res) {
    try {
        let followId = req.body.followId;
        let followArray = [];
        
        for (let i = 0; i < req.user.following.length; i++){
            if (req.user.following[i] != followId) {
                followArray.push(req.user.following[i]);
            }
        }
        let user = await User.findByIdAndUpdate(req.user.id, {following: followArray},{new:true}).lean().exec();  
        res.status(200).json({user:user});
    } catch (err) {
         res.status(400).json({error: err.message});
    }
});

router.get("/currUser", authanticate, async function (req, res) {
    try {
        const user = await User.findById(req.user.id).exec()

         res.status(200).json({user:user});
    } catch (err) {
         res.status(400).json({error: err.message});
    }
})

module.exports = router;