const Validator = require('validator');

module.exports = function validateRegisterInput(data){
    let errors = {};
    const { email, password } = data;
    if (Validator.isEmpty(email)){
        return {
            error: "Email field is required",
            isvalid: false
        }
    } else if (!Validator.isEmail(email)){
        return {
            error: "Not a valid Email Address",
            isvalid: false
        }
    }

    if (Validator.isEmpty(password)){
        return {
            error: "Password Field is Required",
            isvalid: false
        }
    }
    return {
        isValid: true
    }
};