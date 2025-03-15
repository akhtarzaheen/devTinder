const express = require("express");
require("./config/db");

const {User}  = require("./models/user");

const app = express();

const {dbConnect} = require("./config/db");

app.use(express.json());

app.post("/signup",async (req,res) => {
    const user = new User(req.body);
    try{
    await user.save();
    res.send("User added successfully!")
    }catch(e){
        res.status(400).send(e.message);
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
        res.status(401).send("something went wrong!");
    }
});

app.get('/feed',async (req,res) => { 
    try{
        let users = await User.find({});
        if(users){
            res.send(users);
        }else{
            res.status(404).send('Users not found!')
        }
    }catch(e){
        res.status(401).send("something went wrong!");
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