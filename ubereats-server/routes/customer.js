const express = require("express")
const mysql = require("mysql");
const mongoose = require("mongoose");
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const router = express.Router();
const { checkAuth } = require("../Utils/passport");
const axios = require("axios");
const url = "http://localhost:3002";

// const uri = "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority";
  
// mongoose.connect(uri);
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function(){
//     console.log("connected successfully");
// })

// const con = mysql.createConnection({
//     host:"ubereats.c15mrha1l62l.us-west-1.rds.amazonaws.com",
//     user:"username",
//     password:"password",
//     ssl: true,
//     port: 3306,
//     database:"UberEats",
//   })
  
// con.connect(function(err){
//     if (err) throw err;
// })

router.post("/addfavorites", async (req,res)=>{
    // console.log("add to favorites", req.body)
    var result = await Customer.findOne({_id:req.body.Cust_id});
    var fav;
    if(result && !result.favorites.includes(req.body.res_id)){
        fav = result.favorites.concat(req.body.res_id)
    }
    else if(!result){
        fav = [req.body.res_id]
    }
    // console.log(result.favorites.concat(req.body.res_id))
    var values = {
        favorites:fav
    }
    var result = await Customer.findOneAndUpdate({_id:req.body.Cust_id},{$set:values});
    // var sql = "INSERT INTO Favorites (Res_ID, Cust_ID) VALUES ("+req.body.res_id+","+req.body.Cust_id+")";
    if(result){
        res.statusCode=200;
        res.setHeader("Content-Type","text/plain");
        res.end("success");
    }
    else{
        res.send([])
    }
});


router.get("/getAddresses/:customerID", async (req,res)=>{
    // console.log("callled addresses", req.params);
    var result = await Customer.findOne({_id:req.params.customerID});
    if(result){
        // console.log(result);
        res.statusCode=200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(result.address));
    }
    else{
        res.statusCode=500;
        res.setHeader("Content-Type","text/plain");
        res.end([]);
    }
});

router.get("/getFavorites/:customerID", async (req,res)=>{
    // console.log("called favorites", req.params);
    var result = await Customer.findOne({_id:req.params.customerID});
    if(result){
        var ans = [];
        if(result.favorites.length>0){
            for(var idx=0; idx<result.favorites.length; idx++){
                var details = await Owner.findOne({_id:result.favorites[idx]})
                ans.push(details);
            }
        }
        // console.log(ans);
        res.statusCode=200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(ans));
    }
    else{
            // console.log(err);
            res.send([]);
    }
})

module.exports = router;
