const express = require("express");
require("./config/db");

const {User}  = require("./models/user");

const app = express();

const {dbConnect} = require("./config/db");
const req = require("express/lib/request");
const { validateCreds } = require("./utils/utils");

app.use(express.json());

app.post("/signup",async (req,res) => {
    const user = new User(req.body);
    let {firstName,emailId,password} = req.body;
    try{
        validateCreds({
            firstName,
            emailId,
            password
        });
    await user.save();
    res.send("User added successfully!")
    }catch(e){
        res.status(400).send('ERROR : '+e.message);
    }
});

// API /get user by email

app.post("/user",async (req,res) => {
    const email = req.body.emailId;
    try{
        const user = await User.find({emailId:email});
        if(user){
            res.send(user);
        }else{
            res.status(404).send("User not found!");
        }
    }catch(e){
        res.status(400).send(e.message);
    }
});

// Fetch all users from database
app.get('/feed',async (req,res) => { 
    try{
        let users = await User.find({});
        if(users){
            res.send(users);
        }else{
            res.status(404).send('Users not found!')
        }
    }catch(e){
        res.status(400).send(e.message);
    }
})

// Delete user
app.delete("/user",async (req,res) => {
    let userId = req.body.userId;
    try{
        await User.findByIdAndDelete(userId);
        res.send('User deleted successfully!');
    }catch(e){
        res.status(400).send(e.message);
    }
});

// Update User database with id
app.patch("/user",async (req,res) => {
    let data = req.body;
    let userId = req.body.userId;
    let ALLOWED_DATA = [
        "userId",
        "firstName",
        "lastName",
        "emailId",
        "password",
        "age",
        "gender",
        "skills"
    ]
   
    try{
        let isDataAllowed = Object.keys(data).every((key) => {
            if(ALLOWED_DATA.includes(key)){
                return true
            }
            return false;
        })
        if(!isDataAllowed){
            throw new Error('Data insertion not allowed');
        }
        if(req.body.skills.length>3){
            throw new Error('skills can not be more than 3');
        }
        await User.findByIdAndUpdate(userId,data);
        res.send('User updated successfully!');
    }catch(e){
        res.status(400).send(e.message);
    }
})

dbConnect().then(()=> { 
    console.log('connection with clustered successfully!');
    app.listen(4000,() => {
        console.log('Server running on port 4000');
    })
}).catch(() => {
    console.log('connection not established');
});