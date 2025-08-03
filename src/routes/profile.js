const express = require("express");
const { authUser } = require("../middleware/auth");
const profileRouter = express.Router();

profileRouter.get("/profile/view",authUser,async (req,res) => {
    try{
        res.send(req.user);
    }catch(e){
        res.status(400).send(e.message);
    }
});

module.exports = profileRouter;