const express = require("express");
require("./config/db");

const app = express();

const {dbConnect} = require("./config/db");
const req = require("express/lib/request");

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


dbConnect().then(()=> { 
    console.log('connection with clustered successfully!');
    app.listen(4000,() => {
        console.log('Server running on port 4000');
    })
}).catch(() => {
    console.log('connection not established');
});