const express = require("express")
const mysql = require("mysql");
const mongoose = require("mongoose");
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const router = express.Router();
const { checkAuth } = require("../Utils/passport");

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

router.get("/getDetails/:location/:deliveryType/:menuCategory", checkAuth, async (req,res)=>{
    console.log("called here",req.params);
    let result = null;
    if(req.params.location==="~"){
        result = await Owner.find({});
    }
    else{
        result = await Owner.find({ $or: [
        {deliveryType:[req.params.deliveryType]},
        {menuCategory: req.params.menuCategory},
        {city: req.params.location}
        ]})
    }
    console.log(result)
    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(result));
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end([]);
    }
});

module.exports = router;