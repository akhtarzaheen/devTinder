const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");

const bcrypt = require("bcrypt");
const { validateCreds } = require("../utils/utils");

authRouter.post("/signup",async (req,res) => {
    let {firstName,emailId,password} = req.body;
    let hashPassword = await bcrypt.hashSync(password,10);
    req.body.password = hashPassword;
    try{
        validateCreds({
            firstName,
            emailId,
            password
        });
        const user = new User(req.body);
        await user.save();
        res.send("User added successfully!")
    }catch(e){
        res.status(400).send('ERROR : '+e.message);
    }
});

authRouter.post("/login",async (req,res) => {
    let {emailId,password} = req.body;
    try{
        const user = await User.findOne({emailId});
        if(user){
            let isPasswordValid = await user.verifyPassword(password);
            if(isPasswordValid){
                let token = await user.getJWT();
                res.cookie("token", token, {
  httpOnly: true,
  secure: false,       // use true in production with HTTPS
  sameSite: "none"     // ✅ this is the missing piece for Chrome
});
                res.send({status:200,message:"User logged in successfully!",data:user});
            }else{
                throw new Error("Invalid credentials!");
            }
        }else{
            throw new Error("Invalid credentials!");
        }
    }catch(e){
        res.status(400).send(e.message);
    }
});

authRouter.post("/logout",(req,res) => {
    res.clearCookie("token");
    res.send("User logged out successfully!");
});

module.exports = authRouter;

