const express = require("express");
const { authUser } = require("../middleware/auth");
const requestRouter = express.Router();

requestRouter.get('/request/sendConnection',authUser,((req,res) => {
   try{
    res.status(200).send("Request sent successfully!");
   }catch(e){
    res.status(400).send(e.message);
   } 
}));

module.exports = requestRouter;