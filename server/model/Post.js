const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Post Model

const PostSchema = new Schema({
    user:{
        type:Schema.Types.ObjectID,
        ref:'users'
    },
    name:{
        type:String,
        
    },
    avatar:{
        type:String,
    
    },
    text:{
        type:String,
        required:true
    },
    likes:[{
        user:{
            type:Schema.Types.ObjectId,
            ref:'users'
        }

    }],
    comments:[{
        user:{
            type:Schema.Types.ObjectId,
            ref:'users'
        },
        name:{
            type:String,
            
        },
        avatar:{
            type:String,
            
        },
        text:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
    }],
    date:{
        type:Date,
        default:Date.now
    }

});
module.exports = Post = mongoose.model('post',PostSchema);