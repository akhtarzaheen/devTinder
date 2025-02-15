const express = require("express");

const app = express();

app.use('/test',(req,res) => {
    res.send('response for /test')
})

app.use("/",(req,res) => {
    res.send('response for /')
})

app.listen(4000);