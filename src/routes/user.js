const express = require("express");
const { authUser } = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/request/received",authUser,async (req,res) => {
    let loggedInUser = req.user;

   let connectionRequests = await connectionRequest.find({
    toUserId:loggedInUser._id,
    status:"interested"
   }).populate("fromUserId","firstName lastName photoURL about skills");
   if(!connectionRequests){
    return res.status(404).send({message:"No connection requests found!"});
   }
   res.status(200).send({message:"Requests fetched successfully!",data:connectionRequests}); 
})

module.exports = userRouter;