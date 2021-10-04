const Service = require("../models/service");
const mongoose = require("mongoose");

const url ='mongodb://127.0.0.1:27017/logistic';
beforeAll(async () =>{
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex : true
    });
});

afterAll(async () =>{
    await mongoose.connection.close();
});

describe('Delivery Schema Test', () =>{
    it('Add Delivery', () =>{
        const service = {
            "Username":"Username",
            "lastname":"gurung",
            "email":"admin.21@rojgar.com.np",
            "phone":"9844478291",
            "pickupaddress":"pickupaddress",
            "deliveryaddress":"deliveryaddress",
            "product":"product",
            "productQty":"productQty"
        } 
        return ApplyJob.create(service)
            .then((pro_ret) => {
                expect(pro_ret.application).toEqual('this is test application');
        });
    });
});
describe('Delivery Schema Test', () =>{
    it('Update Delivery', async () =>{
        return Service.findOneAndUpdate({
            _id:Object('6136489bdeec3423642f199e')
        },{$set : {application:'test application'}})
           .then((service)=>{
            expect(service.application).toEqual('this is test application')
        })
    })
});
describe('Delivery Schema Test', () =>{
    it('Delivery Delete', async()=>{
        const status = await ApplyJob.deleteOne({_id:'6136489bdeec3423642f199e'});
        expect(status.ok).toBe(1);
    })
});