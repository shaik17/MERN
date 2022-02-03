const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create UserSchema
const UserSchema = new Schema({
    name:{
        type:String,
        reqired:true
    },
    email:{
        type:String,
        reqired:true
    },
    password:{
        type:String,
        reqired:true
    },
    avatar:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    },
});
module.exports = User = mongoose.model('users',UserSchema);