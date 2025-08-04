const express = require("express");
const { authUser } = require("../middleware/auth");
const { validateFields } = require("../utils/utils");
const bcrypt = require("bcrypt");
const profileRouter = express.Router();

profileRouter.get("/profile/view",authUser,async (req,res) => {
    try{
        res.send(req.user);
    }catch(e){
        res.status(400).send(e.message);
    }
});

profileRouter.patch('/profile/edit',authUser,async (req,res) => {
    try{
        
        if(!validateFields(req)){
            res.status(400).send("Request not allowed!");
        }else{
            let loggedInUser = req.user;
            Object.keys(req.body).forEach((item) => loggedInUser[item] = req.body[item]);
            await loggedInUser.save();

            res.status(200).send({msg:"Profile updated successfully!",
                data:loggedInUser
            });
        }
    }catch(e){
        res.status(400).send(e.message);
    }
})

profileRouter.patch("/profile/password",authUser,async(req,res) => {
    try{
        let user = req.user;
        let {currentPassword,newPassword,confirmPassword} = req.body;
        if(user){
            let isPasswordValid = await user.verifyPassword(currentPassword);
            if(isPasswordValid){
               if(newPassword === confirmPassword){
                let hashPassword = await bcrypt.hashSync(newPassword,10);
                   user.password = hashPassword;
                   await user.save();
                   res.status(200).send('Password updated successfully!');
               }else{
                   throw new Error("Passwords do not match!");
               } 
            }else{
                throw new Error("Current password is not valid!");
            }
        }else{
            throw new Error("User not found!");
        }
    }catch(error){
        res.status(400).send(error.message);
    }
})

module.exports = profileRouter;