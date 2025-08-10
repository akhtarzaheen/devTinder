const express = require("express");
const { authUser } = require("../middleware/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

requestRouter.post('/request/connection/send/:status/:userId',authUser,(async (req,res) => {
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

requestRouter.post('/request/connection/review/:status/:requestId',authUser,(async (req, res) => {
    try{
        let loggedInUser = req.user;
        let {status, requestId} = req.params;
        let allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send({message:"Status not allowed!"});
        }
        let connectionRequest = await ConnectionRequest.findOne({
        fromUserId:requestId,
          toUserId:loggedInUser._id,
          status:"interested",
        });
        if(!connectionRequest){
            return res.status(404).send({"message":"Connection request not found!"});
        }
        connectionRequest.status = status;
        await connectionRequest.save();
         res.status(200).send({message:`Connection request ${status} successfully!`,data:connectionRequest});
    }catch(error){
        res.status(400).send(error.message);
    }
}))

module.exports = requestRouter;