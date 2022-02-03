const  validator = require('validator');
const  isEmpty = require('./is-empty');

module.exports = function validationProfileInput(data){
    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    data.status = !isEmpty(data.status) ? data.status : '';
   

    if(!validator.isLength(data.handle,{min:2,max:40})){
         errors.handle = 'Handle needs to between 2 and 40 characters';
    }
    
    if(validator.isEmpty(data.skills)){
        errors.skills = 'Skills is Required';
    }
   // if(validator.isEmpty(data.handle)){
      //  errors.handle = 'Profile handle is Required';
        //}
    
    if(validator.isEmpty(data.status)){
        errors.status = 'Status filed is Required';
    }
    if(!isEmpty(data.githubusername)){
        if(!validator.isURL(data.githubusername)){
            errors.githubusername = "Not a Valid URL"
        }
    }
    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = 'Not a Valid URL';
        }
    }
    if(!isEmpty(data.youtube)){
        if(!validator.isURL(data.youtube)){
            errors.youtube = 'Not a Valid URL';
        }
    }
    if(!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = 'Not a Valid URL';
        }
    }
    if(!isEmpty(data.facebook)){
        if(!validator.isURL(data.facebook)){
            errors.facebook = 'Not a Valid URL';
        }
    }
    if(!isEmpty(data.instagram)){
        if(!validator.isURL(data.instagram)){
            errors.instagram = 'Not a Valid URL';
        }
    }
    if(!isEmpty(data.linkedin)){
        if(!validator.isURL(data.linkedin)){
            errors.linkedin = 'Not a Valid URL';
        }
    }
    return{
        errors,
        isValid:isEmpty(errors)
    }
}

