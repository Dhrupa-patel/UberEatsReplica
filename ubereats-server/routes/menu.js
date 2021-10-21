const express = require("express")
const mysql = require("mysql");
const router = express.Router();
// const con = require("../serverConfig");
const mongoose = require("mongoose");
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const { checkAuth } = require("../Utils/passport");

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

const uri = "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority";
  
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
    console.log("connected successfully");
})

router.get("/getDetails/:user_id", checkAuth, async (req,res)=>{
    var result = await Owner.findOne({_id:req.params.user_id})
    console.log("get details",result);
    if(result){
        if(result.dishes.length>0){
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            // console.log(result);
            var ans = {"dishes":result.dishes,"res":result._id}
            res.end(JSON.stringify(ans));
            return;
        }
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;

    }
});

router.post("/delete", checkAuth, async (req,res)=>{
    console.log("delete item called",req.body);
    var result = await Owner.findOne({_id:req.body.Res_ID})
    var index = null;
    if(result){
        for(var idx=0; idx<result.dishes.length; idx++){
            if (result.dishes[idx].id===req.body.dishid){
                index = idx;
                break;
            }
        }
        if(index!==null){
            result.dishes.splice(idx,1);
        }
    }
    var result = await Owner.findOneAndUpdate({_id:req.body.Res_ID},{$set:{dishes:result.dishes}}, {upsert: true});
    if(result){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end("success");
    }
    else{
        console.log(err);
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

router.get("/getRestaurantIDs/:search", checkAuth, async (req, res)=>{
    console.log("called resIDS", req.params);
    var result = await Owner.find( {$or:[
        {name: {$regex: "^"+req.params.search+"+", $options: "i"}},
        {city: {$regex: "^"+req.params.search+"+", $options: "i"}},
        {"dishes.name": {$regex: "^"+req.params.search+"+", $options: "i"}}
    ]});
    // console.log("unique res", result);
    if(result){
        if(result.length>=0){
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(result));
        }
        else{
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("No_ENTRY_FOUND");
        }
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","text/plain");
        res.end("Database Error");
        return;
    }
});

router.post("/addItem", checkAuth, async (req,res)=>{
    console.log("add item called",req.body);
    var result = await Owner.findOne({_id:req.body.Res_ID});
    var dish;
    dish = result.dishes.concat({
        "id":result.dish_id+1,
        "name": req.body.Dish_Name,
        "price": req.body.Dish_Price,
        "description": req.body.Dish_Description,
        "ingredients": req.body.Ingredients,
        "image":req.body.imagelocation,
        "category": req.body.Dish_Category
    });
    console.log(dish);
    var values = {
        _id: req.body.Res_ID, 
        dishes:dish,
        dish_id: result.dish_id+1
    }
    
    var result = await Owner.findOneAndUpdate({_id:req.body.Res_ID}, {$set:values}, {upsert:true})
    console.log(result);
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

router.post("/edititem", checkAuth, async (req,res)=>{
    console.log("edit item called",req.body);
    var result = await Owner.findOne({_id:req.body.Res_ID})
    values = {
        id: req.body.dishid,
        name: req.body.dishname, 
        description: req.body.description, 
        category: req.body.category, 
        price: req.body.price,
        ingredients: req.body.ingredients,
        image: req.body.image
    };

    if(result){
        for(var idx=0; idx<result.dishes.length; idx++){
            if (result.dishes[idx]["id"]===req.body.dishid){
                result.dishes[idx] = values;
                break;
            }
        }
    }
    else{
        result = {dishes:values}
    }
    var result = await Owner.findOneAndUpdate({_id:req.body.Res_ID},{$set:{dishes:result.dishes}},{upsert: true});
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
    // console.log(sql);

});


module.exports = router;