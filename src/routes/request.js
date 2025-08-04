const express = require("express");
const { authUser } = require("../middleware/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post('/request/connection/:status/:userId',authUser,(async (req,res) => {
   try{
    let loggedInUser = req.user;
    let {status,userId} = req.params;
    let fromUserId = loggedInUser._id;
    let toUserId = userId;

    let allowedStatuses = ["ignored","interested"];
    if(!allowedStatuses.includes(status)){
       return res.status(404).send(`status: ${status} not allowed!`);
    }

    let existingUser = await User.findById(toUserId);
    if(!existingUser){
        return res.status(404).send({message:"User not found!"});
    }


    let exsitingConnection = await ConnectionRequest.findOne({fromUserId,toUserId});
    if(exsitingConnection){
        return res.status(400).send({message:"Connection already exists!"});
    }

    let connectionRequest = new ConnectionRequest({
        fromUserId,toUserId,status
    });
    await connectionRequest.save();
    res.status(200).send({message:"Connection request sent successfully!",data:connectionRequest});
   }catch(e){
    res.status(400).send(e.message);
   } 
}));

module.exports = requestRouter;