const express = require("express")
const mongoose = require("mongoose");
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const bcrypt = require("bcrypt");
const router = express.Router();
const { checkAuth } = require("../Utils/passport");

// const uri = "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority";
  
// mongoose.connect(uri);
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", async function(){
//     console.log("connected successfully");
// })

const saltRounds = 10;
router.post("/customer", async(req,res)=>{
    try{
        // console.log("Customer signup", req.body);
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        var name = req.body.firstName+" "+req.body.lastName;
        var new_id = await Customer.countDocuments({})+1
        const user = new Customer({
            _id: "Cust"+ String(new_id),
            email: req.body.email,
            password: hashPassword,
            name: name,
            dateOfBirth: req.body.dob,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            address: [req.body.address],
            nickname: req.body.nickname,
        });

        const saveCus = await user.save();
        if(saveCus){
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("USER_ADDED");
            return;
        }
    } catch(err){
        console.log(err);
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Error in Data");
        return;
    }
});

router.post("/owner", async(req, res)=>{
    console.log("owner Signup", req.body);
    try{
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
        var new_id = await Owner.countDocuments({})+1
        const user = new Owner({
            _id: "Res"+String(new_id),
            email: req.body.email,
            password: hashPassword,
            name: req.body.name,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            phoneNumber: req.body.phonenumber,
            timings: "8:00 AM - 12:00 PM",
            description: req.body.description,
            menuCategory: req.body.menucategory,
            deliveryType: req.body.delivery
        });
        console.log(user);
        const saveOwn = await user.save();
        if(saveOwn){
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("USER_ADDED");
            return;
        }
    } catch(err){
        console.log(err);
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

module.exports = router;