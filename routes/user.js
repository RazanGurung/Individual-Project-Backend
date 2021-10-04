const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const userconfig = require("../config/user.config");
const nodemailer = require("../config/nodemailer.config");

router.post("/user/register",[
    check("email","Invalid Email Address").isEmail().notEmpty(),
],
    function(req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            
           res.status(400).json(errors.array())
        }else{
            const token = jwt.sign({ email: req.body.email }, userconfig.secret);
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const phone = req.body.phone;
            const address = req.body.address;
            const ConfirmationCode = token;
            const password = req.body.password;
            bcrypt.genSalt(10, (err,salt)=>{
                bcrypt.hash(password,salt,function(err,hash){
                    const user = new User({
                        firstname:firstname,
                        lastname:lastname,
                        email:email,
                        phone:phone,
                        address:address,
                        ConfirmationCode:ConfirmationCode,
                        password:hash
                    });
                    user.save()
                    .then(function(result){
                        res.status(201).json({message : "User Registration Successful",success:true})
                        nodemailer.sendConfirmationEmail(firstname,email,ConfirmationCode);
                    })
                    .catch(function(err){
                        res.status(500).json({message : err,success:false})
                    });
                })
            });
        }
});

router.get("/get/user/:id",function (req,res){
    const id = req.params.id;
    User.findOne({_id:id}).then((data)=>{
        res.status(200).json(data)
    }).catch((err)=>{
        res.status(500).json({message:error})
    })
})

router.get("/get/all/user",function (req,res){
    User.find().then((data)=>{
        res.status(200).json(data)
    }).catch((err)=>{
        res.status(500).json({message:error})
    })
})

router.post("/user/login",function (req,res){
    const {email,password} = req.body;
    User.findOne({email : email})
    .then(function (data) {
        if(data == null){
           return res.status(400).json({message : "Invalid email or Password",success:false})
        }
        if(data.verified == "false"){
            return res.status(400).json({message : "Unverified Account",success:false})
        }
        bcrypt.compare(password,data.password, function(err,result){
            if(result === false){
                return res.status(403).json({message : "Invalid email or Password",success:false})
            }
            const token =  jwt.sign({userid : data._id},'secretkey');
            res.status(200).json({message:"Login Successful",token:token,success:true,data:data});
        })
    }
    )
    .catch(function(err){
        res.status(500).json({message:err,success:false})
    })
});

router.put("/user/confirm/:token",function(req,res){
    const token = req.params.token;
    const verify = true
    User.updateOne({ConfirmationCode:token},{
        verified:verify
    }).then(data=>{
        res.status(200).json("verfication completed")
    }).catch(err=>{
        res.status(500).json("Error verifying completed")
    })
})

router.put("/user/update/:id",function(req,res){
    const id = req.params.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone = req.body.phone;
    const address = req.body.address;

    User.updateOne({_id:id},
        {   firstname:firstname,
            lastname:lastname,
            phone:phone,
            address:address
                }).then(function(data){
                    res.status(200).json({message : "User Updated",success:true})
                }).catch(function(err){
                    res.status(500).json({message : err,success:false})
                })
});

router.put("/user/update/password/:id",function(req,res){
    const id = req.params.id;
    const {oldpassword,newpassword} = req.body;
    User.findOne({_id:id}).then(function(data){
        bcrypt.compare(oldpassword,data.password, function(err,result){
            if(result === false){
                return res.status(403).json({message : "Password Didnt Matched",success:false})
            }else{
                bcrypt.hash(newpassword,10,function(err,hash){
                    User.updateOne({ _id:id},
                        {password : hash}).then(function(result){
                        res.status(200).json({message:"Password Updated Successfully", success:true})
                    }).catch(function(err){
                        res.status(500).json({message:"Password Update Failed",success:false})
                    })
                })
            }
        })
    }).catch(function(err){
        res.status(500).json({message:"Password Update Failed", success:false})
    })
});

router.delete("/user/delete/:id",function(req,res){
const id = req.params.id;
User.findOne({_id:id}).then(function(data){
    var image = data.profile
    if(image != "noImage.jpg"){
        fs.unlinkSync(image, (err) => { 
            if(err){
                res.status(400).json({message : "error deleting file", success:false})
                return
            }
        })
    }
}) .catch(function(err){
    res.status(400).json({message : "file not found", success:false})
})
User.deleteOne({_id:id})
.then(function(result){
    res.status(200).json({message : "Accouted Deleted Successfully",success:true})
})
.catch(function(err){
    res.status(400).json({message : "error deleting account", success:false})
})  

});

module.exports = router