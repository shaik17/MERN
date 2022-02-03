const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function ValidateEducation(data){
    let errors = {}
    data.school = !isEmpty(data.school) ?  data.school :'';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ?  data.fieldofstudy :'';
    data.from = !isEmpty(data.from) ?  data.from :'';
    data.degree = !isEmpty(data.degree) ?  data.degree :'';
    if(validator.isEmpty(data.school)){
       errors.school = " School field Is Required"
    }
    if(validator.isEmpty(data.degree)){
        errors.degree = " Degree field Is Required"
     }
    if(validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy = " fieldofstudy field Is Required"
    }
     if(validator.isEmpty(data.from)){
        errors.from = " Date  field Is Required"
    }
     return{
         errors,
         isValid:isEmpty(errors)
     }

}