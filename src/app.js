const express = require("express");

const app = express();

app.use('/test',(req,res) => {
    res.send('response for /test')
})



app.post("/user/:userId",(req,res) => {
    console.log(req.params)
    res.send({firstName:"Zaheen",lastName:"Akhtar"})
})

app.get('/user',(req,res) => {
    res.send('fetched user details')
});

app.delete('/user/:userId',(req,res) => {
    console.log(req.params)
    res.send('delete user')
})

app.use("/",(req,res) => {
    res.send('response for /')
})

app.listen(4000);