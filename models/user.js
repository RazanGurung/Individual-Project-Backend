const mongoose = require('mongoose');
const { stringify } = require('querystring');
const User = mongoose.model('User',{
    firstname: {
        type : String,
        reduired : true
    },
    lastname: {
        type : String,
        reduired : true
    },
    email: {
        type : String,
        reduired : true,
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
        reduired : true
    },
    profile : {
        type : String,
        default : "noImage.jpg"
    }
});
module.exports = User;
