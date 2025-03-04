const express = require("express");

const app = express();

// app.use('/test',(req,res) => {
//     res.send('response for /test')
// })



// app.post("/user/:userId",(req,res) => {
//     console.log(req.params)
//     res.send({firstName:"Zaheen",lastName:"Akhtar"})
// })

// app.get('/user',(req,res) => {
//     res.send('fetched user details')
// });

// app.delete('/user/:userId',(req,res) => {
//     console.log(req.params)
//     res.send('delete user')
// })

// app.use("/",(req,res) => {
//     res.send('response for /')
// })

// app.use('/user',(req,res) => {
//     console.log('first handler');
//     res.send('first');
// },(req,res) => {
//     console.log('second handler');
//     res.send('second');
// })

app.use('/user',(req,res,next) => {
    console.log('1st route handler');
    next();
},(req,res,next) => {
    console.log('2nd route handler');
    next();
},(req,res,next) => {
    console.log('3rd route handler');
    next();
},(req,res,next) => {
    console.log('4th route handler');
    res.send('4th route handler');
})

app.listen(4000);