const jwt = require("jsonwebtoken");
const {User} = require("../models/user");

const authUser = async (req,res,next) => {
    try{    
        let token = req.cookies.token;
        if(!token){
            throw new Error('Token not found');
        }else{
            let decoded = jwt.verify(token,"Zaheen@2021");
            const {id} = decoded;
            let user = await User.findById(id);
            if(!user){
                throw new Error('User not found');
            }
            req.user = user;
            next();
        }
    }catch(error){
        res.status(400).send("Unauthorized user!");
    }
}

module.exports = {
    authUser
}