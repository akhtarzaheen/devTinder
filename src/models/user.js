const mongoose  = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50,
    },
    lastName:{
        type:String,
        required:true,
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
        required:true,
        validate:(value) => {
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong!");
            }
        }
    },
    photoURL:{
        type:String,
        default:"https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid",
        validate:(value) => {
            if(!validator.isURL(value)){
                throw new Error("Photo URL is not valid!");
            }
        }
    },
    about:{
        type:String,
        default:"This is default about description"
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        enum:{
            values:["male","female","other"],
            message:`{VALUE} is not a valid gender!`
        }
        // validate:(gender) => {
        //     if(!["male","female","other"].includes(gender)){
        //         throw new Error("invalid gender!");
        //     }
        // }
    },
    skills:{
        type:[String]
    }
},{
    timestamps:true
}
);

userSchema.methods.getJWT = async function() {
    let user = this;
    let token = await jwt.sign({id:user._id},"Zaheen@2021");
    return token;
}

userSchema.methods.verifyPassword = async function(passwordInputByUser){
    let user = this;
    let password = user.password;
    let isPasswordValid = await bcrypt.compare(passwordInputByUser,password)
    return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);