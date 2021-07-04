const express = require('express');
const fs = require("fs");
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const router = express.Router();

router.post("/user/register",[
    check("email","Invalid Email Address").isEmail().notEmpty(),
],
    function(req,res){
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            
           res.status(400).json(errors.array())
        }else{
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const phone = req.body.phone;
            const address = req.body.address;
            const password = req.body.password;
            bcrypt.hash(password,10,function(err,hash){
                const user = new User({
                    firstname:firstname,
                    lastname:lastname,
                    email:email,
                    phone:phone,
                    address:address,
                    password:hash
                });
                user.save()
                .then(function(result){
                    res.status(201).json({message : "User Registration Successful",success:true})
                })
                .catch(function(err){
                    res.status(500).json({message : err,success:false})
                });
            })
            
        }
});

router.post("/user/login",function (req,res){
    const {email,password} = req.body;
    User.findOne({email : email})
    .then(function (data) {
        if(data == null){
           return res.status(400).json({message : "Invalid email or Password",success:false})
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

router.put("/user/update/:id",function(req,res){
    const id = req.params.id;
    const firstname = req.body.firstname;
    const middlename = req.body.middlename;
    const lastname = req.body.lastname;
    const phone = req.body.phone;
    const address = req.body.address;

    User.updateOne({_id:id},
        {   firstname:firstname,
            middlename:middlename,
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

router.put("/user/update/profile/:id",function(req,res){
// if(req.file == undefined){
//     return res.status(400).json({message : "invalid file", success:false})
// }
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
User.updateOne({_id:id},{profile : req.file.path}).then(function(result){
    res.status(200).json({message:"Profile update successfully",success:true})
}).catch(function(err){
    res.status(500).json({message:"Failed to Update Profile Picture", success : false})
})
})

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