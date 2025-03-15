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
})

dbConnect().then(()=> { 
    console.log('connection with clustered successfully!');
    app.listen(4000,() => {
        console.log('Server running on port 4000');
    })
}).catch(() => {
    console.log('connection not established');
});