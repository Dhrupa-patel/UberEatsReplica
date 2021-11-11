const express = require("express")
const mysql = require("mysql");
const mongoose = require("mongoose");
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const router = express.Router();
var kafka = require("../kafka/client");
const { checkAuth } = require("../Utils/passport");

const uri = "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority";
  
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", async function(){
    console.log("connected successfully");
})
const con = mysql.createConnection({
    host:"ubereats.c15mrha1l62l.us-west-1.rds.amazonaws.com",
    user:"admin",
    password:"Siddhi*5501",
    ssl: true,
    port: 3306,
    database:"UberEats",
  })
  
// con.connect(function(err){
//     if (err) throw err;
// })

router.get("/restaurantprofile/:user_id", async (req,res)=>{
    // console.log("profile res called",req.params);
    var result = await Owner.findOne({_id:req.params.user_id});
    // console.log(result);
    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        let userObj = {"profile":{"Name":result.name, "Email_ID":result.email, "Description":result.description,
        "Country":result.country, "State":result.state, "City":result.city,
        "Timings":result.timings,"Delivery_Type":result.deliveryType},"fileName":result.images[0]};
        console.log(userObj);
        res.end(JSON.stringify(userObj));

    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

router.post("/updaterestaurantprofile", async (req,res)=>{
    // console.log("update res called",req.body);
    var values = {
        email: req.body.email,
        name: req.body.name,
        description: req.body.description,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        timings: req.body.timings,
        deliveryType: req.body.deliveryType,
        images: req.body.images
    };
    var result = await Owner.findOneAndUpdate({_id:req.body.user_id}, {$set:values}, {upsert: true});
    // console.log(result);
    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end("sucess");
        return;
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

router.post("/updatecustomerprofile", async (req,res)=>{
    console.log(req.body);
    var values = {
        email: req.body.email, 
        dateOfBirth: req.body.DOB,
        city: req.body.city, 
        state: req.body.state,
        country: req.body.country, 
        name: req.body.name, 
        nickname: req.body.nickname,
        _id: req.body.user_id
    };
    
    var result = await Customer.findOneAndUpdate({_id:req.body.user_id}, {$set:values}, {upsert: true});

    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end("success");
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

router.get("/customerprofile/:user_id", async (req,res)=>{
    console.log("profile customer called",req.params);
    let sql = "SELECT * FROM Customers WHERE Cust_ID='"+req.params.user_id+"'";
    var result = await Customer.findOne({_id:req.params.user_id});
    console.log(result);
    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        let userObj = {"profile":{"Name":result.name, "Email ID":result.email, "Country":result.country, "State":result.state, 
        "City":result.city, "Date of Birth": result.dateOfBirth}, "Nickname": result.nickname, "fileName":result.image};
        res.end(JSON.stringify(userObj));
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

module.exports = router;