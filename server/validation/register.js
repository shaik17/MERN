const validator = require('validator');
const isEmpty  = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};
     data.name = !isEmpty(data.name) ? data.name: '';
     data.email = !isEmpty(data.email) ? data.email: ''; 
     data.password = !isEmpty(data.password) ? data.password: '';
     data.password2 = !isEmpty(data.password2) ? data.password2 : ''; 

    if(!validator.isLength(data.name,{min:3,max:30})){
    errors.name = "Name must be between 2 and 30 characters";
    }
    if(validator.isEmpty(data.name)){
        errors.name="Name field is Required";
    }
    if(!validator.isEmail(data.email)){
        errors.email="Email is invalid";
    }
    if(validator.isEmpty(data.email)){
        errors.email="Email field is Required";
    }
    if(!validator.isLength(data.password,{min:6,max:15})){
        errors.password="Password Must be between 6 to 20 Characters ";
    }
    if(validator.isEmpty(data.password)){
        errors.password="Password field is Required";
    }
    if(validator.isEmpty(data.password2)){
        errors.password2="Confirm Password Field Is Required"
    }
    if(!validator.equals(data.password,data.password2)){
        errors.password2="Password Must Match"
    }
    return{
        errors,
        isvalid:isEmpty(errors)
    }
}