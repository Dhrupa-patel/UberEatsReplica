const express = require("express")
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const router = express.Router();

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
    console.log("connected");
})
const saltRounds = 10;
router.post("/customer", async(req,res)=>{

    console.log("Customer signup", req.body);
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    var name = req.body.firstName+" "+req.body.lastName;
    let sql = "INSERT INTO Customers (Cust_Email, Cust_Password, Cust_DOB, Cust_City, Cust_State, Cust_Country,\
         Name) VALUES (?,?,?,?,?,?,?)";
    
    var values = [req.body.email,hashPassword,"1997-12-03",req.body.city,req.body.state,req.body.country,name];
    console.log("sql",sql);
    con.query(sql, values, (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Error in Data");
            return;
        }
        console.log(result);
        if(result){
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("USER_ADDED");
            return;
        }
        else{
            res.statusCode = 401;
            res.setHeader("Content-Type","text/plain");
            res.end("NO_USER");
            return;
        }
    });
});

router.post("/owner", async(req, res)=>{
    console.log("owner Signup", req.body);
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    let sql = "INSERT INTO Restaurants (Res_Name, Res_State, Res_City, Phone_Number, Timings,\
        Res_Password, Country, Description, Res_Email,Delivery_Type,Menu_Category) \
        VALUES (?)";
    
    var values = [req.body.name, req.body.state, req.body.city,
        req.body.phonenumber,"8:00-23:00",hashPassword, req.body.country,req.body.description,req.body.email,req.body.delivery,
    req.body.menucategory];

    con.query(sql, [values], (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        var results = JSON.stringify(result);
        if(result){
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("USER_ADDED");
            return;
        }
        else{
            res.statusCode = 401;
            res.setHeader("Content-Type","text/plain");
            res.end("NO_USER");
            return;
        }
    })
});

module.exports = router;