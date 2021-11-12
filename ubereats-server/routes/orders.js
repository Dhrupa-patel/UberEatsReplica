const express = require("express")
const mysql = require("mysql");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const Order = require("../model/Orders");
var kafka = require("../kafka/client");
const { checkAuth } = require("../Utils/passport");

const uri = "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority";
  
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
    console.log("connected successfully");
})


// const con = mysql.createConnection({
//     host:"ubereats.c15mrha1l62l.us-west-1.rds.amazonaws.com",
//     user:"admin",
//     password:"Siddhi*5501",
//     ssl: true,
//     port: 3306,
//     database:"UberEats",
//   })
  
// con.connect(function(err){
//     if (err) throw err;
// })

router.post("/updateStatus", checkAuth, async (req,res)=>{
    console.log("update status",req.body);
    kafka.make_request("update_status", req.body, function(err, results){
        console.log("in result");
        console.log("res ", results);
        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("success");
        }
    });
    // var result = await Order.findOneAndUpdate({_id:req.body.Order_ID},{$set:{orderStatus:req.body.Order_Status}});
    // if(result){
    //     res.statusCode = 200;
    //     res.setHeader("Content-Type","text/plain");
    //     res.end("Success");
    //     return;
    // }
    // else{
    //     res.statusCode = 500;
    //     res.setHeader("Content-Type","text/plain");
    //     res.end("Database Error");
    //     return;
    // }
});

router.post("/cancelOrder", checkAuth, async(req,res)=>{

    console.log("cancel_order", req.body);
    var result = await Order.findOneAndUpdate({"_id":req.body.id},{$set:{"orderStatus":"Cancelled Order"}},{new:true});
    if (result){
        console.log("after cancell", result);
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end("");
        return;
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Error");
        return;
    }
});

router.get("/ResOrders/:res_id",checkAuth, async(req,res)=>{
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

router.get("/CustOrders/:cust_id",checkAuth, async (req,res)=>{
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

router.get("/getID", checkAuth, async (req,res)=>{
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
router.get("/getdetails/:order_id", checkAuth, async(req,res)=>{
    console.log("getdetails",req.params);
    var result = await Order.find({_id:req.params.order_id});
    console.log("get details", result[0]);
    if(result){
        var ans={}
        ans["items"]=result[0].order;
        ans["total"] = result[0].totalPrice;
        ans["special_instructions"] = result[0].special_instruct
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
