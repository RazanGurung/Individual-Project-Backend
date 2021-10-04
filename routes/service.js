const express = require('express');
const Service = require('../models/service');
const router = express.Router();

router.post("/add/delivery",function(req,res){
    const username = req.body.Username;
    const phone = req.body.phone;
    const receiver = req.body.receiver;
    const pickupaddress = req.body.pickupaddress;
    const deliveryaddress = req.body.deliveryaddress;
    const product = req.body.product;
    const productQty = req.body.productQty;
    const id = req.body.id;
    const service = new Service({
        username:username,
        phone:phone,
        receiver:receiver,
        pickupaddress:pickupaddress,
        deliveryaddress:deliveryaddress,
        product:product,
        productQty:productQty,
        id:id
    });
    service.save()
    .then(function(result){
        res.status(201).json({message : "Ordered delivered successfully",success:true})
    })
    .catch(function(err){
        res.status(300).json({message : err,success:false})
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

router.get("/get/delivery/:id", function(req,res){
    const id = req.params.id;
    Service.findOne({_id:id}).then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json("Error populating")
    })
})

router.get("/get/all/delivery", function(req,res){
    Service.find().then(data=>{
        res.status(200).json(data)
    }).catch(err=>{
        res.status(500).json("Error populating")
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