const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate:(gender) => {
            if(!["male","female","other"].includes(gender)){
                throw new Error("invalid gender!");
            }
        }
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
}
);

const User = mongoose.model("User",userSchema);

module.exports = {
    User
}