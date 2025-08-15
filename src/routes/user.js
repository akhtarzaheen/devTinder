const express = require("express");
const { authUser } = require("../middleware/auth");
const user = require("../models/user");
const { Connection } = require("mongoose");
const connectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

const SAFE_USER_DATE = "firstName lastName photoURL about skills"

userRouter.get("/user/request/received",authUser,async (req,res) => {
    let loggedInUser = req.user;

   let connectionRequests = await connectionRequest.find({
    toUserId:loggedInUser._id,
    status:"interested"
   }).populate("fromUserId",SAFE_USER_DATE);
   if(!connectionRequests){
    return res.status(404).send({message:"No connection requests found!"});
   }
   res.status(200).send({message:"Requests fetched successfully!",data:connectionRequests}); 
})

userRouter.get("/user/connections",authUser,async (req,res) => {
    let loggedInUser = req.user;
    let connectionRequests = await connectionRequest.find({
        status:"accepted",
        $or:[
            {fromUserId:loggedInUser?._id},
            {toUserId:loggedInUser?._id}
        ]
   }).populate("fromUserId",SAFE_USER_DATE).populate("toUserId",SAFE_USER_DATE);
   if(!connectionRequests){
    return res.status(404).send({message:"No connections found!"});
   }
   let filteredData = connectionRequests.map((ele) => {
    if(ele.fromUserId._id.toString() === loggedInUser._id.toString()){
    return ele.toUserId;
    }
    return ele.fromUserId
   }
    )
   res.status(200).send({message:"Connections fetched successfully!",data:filteredData});

})

userRouter.post('/user/connections/feed',authUser, (async (req,res) => {
    try{
        let loggedInUser = req.user;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        let skip = (page-1)*limit
        let connectionRequests = await connectionRequest.find({
            $or:[
                {frontUserId:loggedInUser._id},
                {toUserId:loggedInUser._id},
            ]
        });

        let set = new Set();
        connectionRequests.forEach(ele => {
            set.add(ele);
        });

        let users = await user.find({
            $and:[
                {_id:{$nin:Array.from(set)}},
                {_id:{$ne:loggedInUser._id}}
            ]
        }).select(SAFE_USER_DATE).skip(skip).limit(limit);

        res.status(200).send(users);
    }catch(error){
        res.status(400).send(error.message);
    }
}))

module.exports = userRouter;