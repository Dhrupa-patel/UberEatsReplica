const express = require("express")
const mongoose = require("mongoose");
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const router = express.Router();
var bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const { auth } = require("../Utils/passport");
const secret = "CMPE273";
// const con = require("../serverConfig");
// const uri = "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority";
  
// mongoose.connect(uri);
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function(){
//     console.log("connected successfully");
// })
auth();

router.get("/customer", async (req, res)=>{
    // console.log("customer get API called");
    const result = await Customer.find(); 
    if(result){
        var emails = {"Emails":[]};
        for(let i=0; i<result.length;i++){
            emails["Emails"].push(result[i]["email"]);
        }
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(emails));
    }
    else{
        res.send([]);
    }
});

router.post("/customer", async (req,res)=>{
    // console.log("Customer Login", req.body);
    var result = await Customer.find({email:req.body.email});
    // console.log("result", result);
    if(result){
        if(result.length>0){
            const encryptedPassword = await bcrypt.compare(
                req.body.password,
                result[0].password
              );
            if(encryptedPassword){
                const payload = {
                    _id:result[0]._id,
                    name:result[0].name,
                    email:result[0].email,
                    location: result[0].city,
                    type:"customer"
                };
                const token = await jwt.sign(payload, secret, {
                    expiresIn: 1000000,
                });
                req.session.userEmailId = req.body.email;
                let userObj = {user_id:result[0]._id, name:result[0].name, location:result[0].city, email:result[0].email, password:req.body.password};
                res.statusCode = 200;
                res.status(200).json({token:"jwt "+token});
                return;
            }
            else{
                res.statusCode = 401;
                res.setHeader("Content-Type","text/plain");
                res.end("INCORRECT PASSWORD");
                return;
            }
        }
        else{
            res.statusCode = 401;
            res.setHeader("Content-Type","text/plain");
            res.end("NO_USER");
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
router.get("/owner", async (req, res)=>{
    // console.log("owner get API called");
    const result = await Owner.find(); 
    // console.log("result", result);
    if(result){
        var emails = {"Emails":[]};
        for(let i=0; i<result.length;i++){
            emails["Emails"].push(result[i]["email"]);
        }
        // console.log(emails)
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(emails));
    }
    else{
        // console.log(err)
        res.send([]);
    }
});

router.post("/owner", async (req, res)=>{
    // console.log("owner Login", req.body);
    var result = await Owner.find({email:req.body.email});
    // console.log("result", result);
    if(result){
        if(result.length>0){
            const encryptedPassword = await bcrypt.compare(
                req.body.password,
                result[0].password
              );
            if(encryptedPassword){
                const payload = {
                    _id:result[0]._id,
                    name:result[0].name,
                    email:result[0].email,
                    location: result[0].city,
                    type:"owner"
                };
                const token = await jwt.sign(payload, secret, {
                    expiresIn: 1000000,
                });
                req.session.userEmailId = req.body.email;
                let userObj = {user_id:result[0]._id ,name:result[0].name, location:result[0].state, email:result[0].email, password:result[0].password};
                res.statusCode = 200;
                res.status(200).json({token:"jwt "+token});
                return;
            }
            else{
                res.statusCode = 401;
                res.setHeader("Content-Type","text/plain");
                res.end("INCORRECT PASSWORD");
                return;
            }
        }
        else{
            res.statusCode = 401;
            res.setHeader("Content-Type","text/plain");
            res.end("NO_USER");
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

module.exports = router;