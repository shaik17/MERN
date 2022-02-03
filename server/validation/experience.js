const validator = require('validator');
const isEmpty = require('./is-empty');
 
module.exports = function validateExperience(data){
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title:'';
    data.company = !isEmpty(data.company) ? data.company:'';
    data.from = !isEmpty(data.from) ? data.from :'';
    if(validator.isEmpty(data.title)){
        errors.title = "Job Title is Required";
    }
    if(validator.isEmpty(data.company)){
        errors.company = "Company Field Is Required";
    }
    if(validator.isEmpty(data.from)){
        errors.from= "From date Field Is Required";
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}
