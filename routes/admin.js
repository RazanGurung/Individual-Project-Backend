const express = require('express');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post("/admin/login",function (req,res){
    const {email,password} = req.body;
    Admin.findOne({email : email})
    .then(function (data) {
        if(data == null){
           return res.status(400).json({message : "Invalid email or Password",success:false})
        }
        bcrypt.compare(password,data.password, function(err,result){
            if(result === false){
                return res.status(403).json({message : "Invalid email or Password",success:false})
            }
            const token =  jwt.sign({adminid : data._id},'secretkey');
            res.status(200).json({message:"Login Successful",token:token,success:true,data:data});
        })
    }
    )
    .catch(function(err){
        res.status(500).json({message:err,success:false})
    })
});

// router.put("/admin/update/:id",function(req,res){
//     const id = req.params.id;
//     const firstname = req.body.firstname;
//     const lastname = req.body.lastname;
//     const phone = req.body.phone;
//     const address = req.body.address;

//     User.updateOne({_id:id},
//         {   firstname:firstname,
//             phone:phone,
//             address:address
//                 }).then(function(data){
//                     res.status(200).json({message : "User Updated",success:true})
//                 }).catch(function(err){
//                     res.status(500).json({message : err,success:false})
//                 })
// });
module.exports = router