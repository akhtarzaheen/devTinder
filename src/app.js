const express = require("express");

const app = express();

app.use('/test',(req,res) => {
    res.send('response for /test')
})



app.post("/user",(req,res) => {
    res.send({firstName:"Zaheen",lastName:"Akhtar"})
})

app.get('/user',(req,res) => {
    res.send('fetched user details')
});

app.delete('/user',(req,res) => {
    res.send('delete user')
})

app.use("/",(req,res) => {
    res.send('response for /')
})

app.listen(4000);