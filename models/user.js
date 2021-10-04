const mongoose = require('mongoose');
const { stringify } = require('querystring');
const User = mongoose.model('User',{
    firstname: {
        type : String,
        required : true
    },
    lastname: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique: true
    },
    phone: {
        type : Number
    },
    address:{
        type : String
    },
    password:{
        type : String,
        required : true
    },
    ConfirmationCode: {
        type: String,
        unique: true,
    },
    verified:{
        type:String,
        default:false
    }
});
module.exports = User;
