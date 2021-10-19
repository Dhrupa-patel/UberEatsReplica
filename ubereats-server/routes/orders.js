const express = require("express")
const mysql = require("mysql");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const Order = require("../model/Orders");

const uri = "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority";
  
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
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
  
con.connect(function(err){
    if (err) throw err;
})

router.post("/updateStatus", async (req,res)=>{
    console.log("update status",req.body);
    var result = await Order.findOneAndUpdate({_id:req.body.Order_ID},{$set:{orderStatus:req.body.Order_Status}});
    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end("Success");
        return;
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

router.get("/ResOrders/:res_id", async(req,res)=>{
    console.log("res", req.params);
    var result = await Order.find({"order.resID":req.params.res_id});
    if(result){
        console.log(result);
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(result));
        return;
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

router.get("/CustOrders/:cust_id", async (req,res)=>{
    // console.log(req.params);
    var result = await Order.find({custId:req.params.cust_id});
    console.log(result);
    if(result){
        console.log(result);
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(result));
        return;
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

router.get("/getID", async (req,res)=>{
    console.log("getID");
    var result = await Order.find();
    console.log(result.length);
    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(result.length));
        return;
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});
router.get("/getdetails/:order_id", async(req,res)=>{
    console.log("getdetails",req.params);
    var result = await Order.find({_id:req.params.order_id});
    console.log("get details", result[0]);
    if(result){
        var ans={}
        ans["items"]=result[0].order;
        ans["total"] = result[0].totalPrice;
        console.log(ans);
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(ans));
        return;
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

module.exports = router;
