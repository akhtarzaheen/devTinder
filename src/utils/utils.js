const validator = require("validator");

const validateCreds = ({firstName,emailId,password}) => {
    if(!firstName){
        throw new Error("First name is required!");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid!");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong!");
    }
}

module.exports = {
    validateCreds
}