const express = require("express");
require("./config/db");

const app = express();
const cors = require("cors");

const {dbConnect} = require("./config/db");
const req = require("express/lib/request");

const cookieParser = require("cookie-parser");
app.use(cors({
  origin: "http://localhost:5173",   // no trailing slash
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.options("*", cors()); 
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


dbConnect().then(()=> { 
    console.log('connection with clustered successfully!');
    app.listen(4000,() => {
        console.log('Server running on port 4000');
    })
}).catch(() => {
    console.log('connection not established');
});