const validator = require('validator');
const isEmpty  = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};
    
     data.email = !isEmpty(data.email) ? data.email: ''; 
     data.password = !isEmpty(data.password) ? data.password: '';
   
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
  
    return{
        errors,
        isvalid:isEmpty(errors)
    }
}
