const express = require('express');
const Service = require('../models/service');
const router = express.Router();

router.post("/add/delivery",function(req,res){
    const Username = req.body.Username;
    const email = req.body.email;
    const phone = req.body.phone;
    const pickupaddress = req.body.pickupaddress;
    const deliveryaddress = req.body.deliveryaddress;
    const product = product;
    const productQty = productQty;
    const service = new Service({
        Username:Username,
        email:email,
        phone:phone,
        pickupaddress:pickupaddress,
        deliveryaddress:deliveryaddress,
        product:product,
        productQty:productQty
    });
    service.save()
    .then(function(result){
        res.status(201).json({message : "Ordered delivered successfully",success:true})
    })
    .catch(function(err){
        res.status(500).json({message : err,success:false})
    });
});

router.put("/update/delivery/:id",function(req,res){
    const id = req.params.id;
    const pickupaddress = req.body.pickupaddress;
    const deliveryaddress = req.body.deliveryaddress;
    const product = product;
    const productQty = productQty;
    Service.updateOne({_id:id},{
        pickupaddress:pickupaddress,
        deliveryaddress:deliveryaddress,
        product:product,
        productQty:productQty
    }).then(data=>{
        res.status(200).json("Update successful completed")
    }).catch(err=>{
        res.status(500).json("Error updating")
    })
})

router.delete("/delivery/delete/:id",function(req,res){
const id = req.params.id;
    Service.deleteOne({_id:id})
    .then(function(result){
        res.status(200).json({message : "Delivery Deleted Successfully",success:true})
    })
    .catch(function(err){
        res.status(400).json({message : "error deleting delivery", success:false})
    })  

    });

module.exports = router