const express = require("express");
require("./config/db");

const {authUser} = require("./middleware/auth");

const {User}  = require("./models/user");

const app = express();

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const {dbConnect} = require("./config/db");
const req = require("express/lib/request");
const { validateCreds } = require("./utils/utils");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res) => {
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

app.post("/login",async (req,res) => {
    let {emailId,password} = req.body;
    try{
        const user = await User.findOne({emailId});
        if(user){
            let isPasswordValid = await bcrypt.compare(password,user.password);
            if(isPasswordValid){
                let token = await jwt.sign({id:user._id},"Zaheen@2021");
                res.cookie('token',token);
                res.send("User logged in successfully!");
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

// API to fetch profile details
app.get("/profile",authUser,async (req,res) => {
    try{
        res.send(req.user);
    }catch(e){
        res.status(400).send(e.message);
    }
});


dbConnect().then(()=> { 
    console.log('connection with clustered successfully!');
    app.listen(4000,() => {
        console.log('Server running on port 4000');
    })
}).catch(() => {
    console.log('connection not established');
});