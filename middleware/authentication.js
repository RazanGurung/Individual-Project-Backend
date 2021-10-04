const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports.userverify = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token,"secretkey");
        User.findOne({_id:decode.userid})
        .then(function(result){
            req.user = result
            next()
        })
        .catch(function(err){
            res.status(401).json({message : "authenticate error",success:false})
        })
    }
    catch(err){
        res.status(500).json({message : "authentication error",success:false});
    }
};