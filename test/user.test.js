const User = require("../models/user");
const mongoose = require("mongoose");

const url ='mongodb://127.0.0.1:27017/testing';
beforeAll(async () =>{
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex : true
    });
});

afterAll(async () =>{
    await mongoose.connection.close();
});
describe('User Schema Test', () =>{
    it('Add User', () =>{
        const user = {
            "firstname":"rajan",
            "lastname":"gurung",
            "email":"razan2147@gmail.com.np",
            "phone":9844478295,
            "address":"baluwatar",
            "password":"hello",
            "ConfirmationCode":"akgdskags"
        } 
        return User.create(user)
            .then((pro_ret) => {
                expect(pro_ret.firstname).toEqual('rajan');
        });
    });
});
describe('User Schema Test', () =>{
    it('Update User', async () =>{
        return User.findOneAndUpdate({
            _id:Object('615a91559ce30f258825fc7d')
        },{$set : {firstname:'rajan'}})
           .then((user)=>{
            expect(user.firstname).toEqual('rajan')
        })
    })
});
describe('User Schema Test', () =>{
    it('User Delete', async()=>{

        const status = await User.deleteOne({_id:'6135dbcb0fccf43054cb8468'});
        expect(status.ok).toBe(1);
    })
});