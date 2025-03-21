const mongoose  = require("mongoose");
const validator = require("validator");

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
        trim:true,
        validate:(value) => {
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid!");
            }
        }
    },
    password:{
        type:String,
        validate:(value) => {
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong!");
            }
        }
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