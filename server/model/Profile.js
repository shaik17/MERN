const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema

const ProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    handle:{
        type:String,
        max:40,
        unique:true
        

    },
    company:{
        type:String

    },
    website:{
        type:String
    },
    location:{
        type:String
    },
    bio:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    githubusername:{
        type:String
    },
    experience:[{
        title:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        },
        from:{
            type:Date,
            required:true
        },
        to:{
            type:Date
        },
        current:{
            type:Boolean,
            default:false
        },
        description:{
            type:String
        },
    }],
    education:[{
         school:{
             type:String,
             required:true
         },
         degree:{
             type:String,
             required:true
         },
         fieldofstudy:{
             type:String,
             required:true
         },
         from:{
             type:Date,
             required:true
         },
         to:{
             type:Date
         },
         current:{
             type:Boolean,
             default:false
         },
         description:{
             type:String
         },
        
    }],
    social:{
        youtube:{
            type:String
        },
        twitter:{
            type:String
        },
        facebook:{
            type:String
        },
        linkedin:{
            type:String
        },
        instagram:{
            type:String
        },
    }
    
});
module.exports = Profile = mongoose.model('Profile',ProfileSchema);
