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

const validateFields = (req) => {
    let allowedFields = ["firstName","lastName","emailId","photoURL","about","age","gender","skills"];
    return Object.keys(req.body).every(field => allowedFields.includes(field));
}

module.exports = {
    validateCreds,
    validateFields
}