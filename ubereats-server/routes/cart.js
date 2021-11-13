const express = require("express")
const mysql = require("mysql");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const Orders = require("../model/Orders");
const { checkAuth } = require("../Utils/passport");
var kafka = require("../kafka/client");

// const uri = "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority";
  
// mongoose.connect(uri);
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function(){
//     console.log("connected successfully");
// })

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

router.post("/addItem", checkAuth, async (req,res)=>{
    console.log("add item",req.body);
    kafka.make_request("add_item_cart", req.body, function(err, results){
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
    
});

router.post("/removeitems", checkAuth, async (req,res)=>{
    console.log(req.body);
    kafka.make_request("delete_item_cart", req.body, function(err, results){
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
            res.end("Deleted");
        }
    });
    
});


router.get("/getItems/:cust_id", checkAuth, async(req,res)=>{
    console.log("get items",req.params);
    var result = await Customer.findOne({_id:req.params.cust_id});
    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(result.cart));
        return;
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});


router.get("/getCartResID/:cust_id", checkAuth, async (req,res)=>{
    console.log(req.params,"called in get cart res");
    var result = await Customer.findOne({_id:req.params.cust_id});
    console.log("Res ID",result);
    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(result.cartResId));
        return;
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});


router.get("/Order/:cust_id", checkAuth,  async (req,res)=>{
    console.log(req.params);
    var result = await Customer.findOne({_id:req.params.cust_id});
    if(result){
        var total = 0;
        var ans = {"items":result.cart};
        for(var idx=0; idx<result.cart.length; idx++){
            total+= Number(result.cart[idx].quantity)*(Number(result.cart[idx].dishPrice))
        }
        ans["total"] = total.toFixed(2);
        ans["resId"] = result.cartResId;
        console.log("ans", ans);
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


router.post("/placeorder", checkAuth, async (req,res)=>{
    console.log(req.body);
    kafka.make_request("place_order", req.body, function(err, results){
        console.log("in result");
        console.log("res ", results);
        if(results==="Database Error"){
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
    // let dateObj = new Date()
    // let date = dateObj.getFullYear()+"-"+dateObj.getMonth()+"-"+dateObj.getDate();
    // let time = dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds();
    // var values= {
    //     totalPrice: req.body.price,
    //     order:req.body.items,
    //     _id:req.body.Order_ID,
    //     customerName: req.body.Cust_Name,
    //     deliveryType: "New Order",
    //     orderStatus: "Order Recieved",
    //     orderMode: req.body.orderMode,
    //     time: time,
    //     date: date,
    //     resId:req.body.Res_ID,
    //     custId:req.body.Cust_ID
    // }
    // var result = await Orders.findOneAndUpdate({_id:req.body.Order_ID},{$set:values},{upsert: true});
    // if(result){
    //     res.statusCode = 200;
    //     res.setHeader("Content-Type","text/plain");
    //     res.end("Placed the order");
    //     return;
    // }
    // else{
    //     res.statusCode = 500;
    //     res.setHeader("Content-Type","text/plain");
    //     res.end("Database Error");
    //     return;
    // }
});

router.post("/removeItem", checkAuth, async (req,res)=>{
    console.log(req.body);
    var result = await Customer.findOne({_id:req.body.Cust_ID});
    if(result){
        for(var idx = 0; idx<result["cart"].length; idx++){
            if(result["cart"][idx]["dishId"]===req.body.dishid){
                result["cart"].splice(idx,1);
                break;
            }
        }

        var ans = await Customer.findOneAndUpdate({_id:req.body.Cust_ID},{$set:{cart:result["cart"]}})
        if(ans){
            console.log(ans)
            res.statusCode = 200
            res.setHeader("Content-Type","text/plain");
            res.end("removed");
        }
        else{
            res.statusCode = 500
            res.setHeader("Content-Type","text/plain");
            res.end("Error");
        }
    }
});

router.post("/updateQuantity", checkAuth, async (req,res)=>{
    console.log("update quantity", req.body);
    var result = await Customer.findOne({_id:req.body.Cust_ID})
    if(result){
        for(var idx = 0; idx<result["cart"].length; idx++){
            if(result["cart"][idx]["dishId"]===req.body.id){
                result["cart"][idx]["quantity"] = req.body.quantity;
                break;
            }
        }

        var ans = await Customer.findOneAndUpdate({_id:req.body.Cust_ID},{$set:{cart:result["cart"]}},{new:true})
        if(ans){
            console.log(ans)
            res.statusCode = 200
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(ans["cart"]));
        }
        else{
            res.statusCode = 500
            res.setHeader("Content-Type","text/plain");
            res.end("Error");
        }
    }
});

module.exports = router;
