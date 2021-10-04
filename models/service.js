const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Service = mongoose.model('Service',{
    username: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    phone: {
        type : Number
    },
    pickupaddress:{
        type : String
    },
    deliveryaddress:{
        type : String
    },
    product:{
        type:String
    },
    productQty:{
        type:String
    }
});
module.exports = Service;