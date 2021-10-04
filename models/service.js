const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Service = mongoose.model('Service',{
    Username: {
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