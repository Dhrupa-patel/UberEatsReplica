const express = require("express")
const mysql = require("mysql");
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

router.post("/updateStatus", (req,res)=>{
    console.log(req.body);
    let sql = "UPDATE Orders SET Order_Status = '" + req.body.Order_Status+"' WHERE Order_ID = "+req.body.Order_ID;
    
    con.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            console.log(result);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("Success");
            return;
        }
    })
});

router.get("/ResOrders/:res_id", (req,res)=>{
    console.log(req.params);
    let sql = "SELECT * FROM Orders WHERE Res_ID ="+req.params.res_id+";"

    con.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            console.log(result);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(result));
            return;
        }
    })
});

router.get("/CustOrders/:cust_id", (req,res)=>{
    console.log(req.params);
    let sql = "SELECT * FROM Orders WHERE Cust_ID ="+req.params.cust_id+" GROUP BY Order_ID;"

    con.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            console.log(result);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(result));
            return;
        }
    })
});

router.get("/getID", (req,res)=>{
    console.log("getID");
    let sql = "SELECT * FROM Orders"

    con.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            console.log(result.length);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(result.length));
            return;
        }
    })
});
router.get("/getdetails/:order_id", (req,res)=>{
    console.log("getdetails",req.params);
    let sql = "SELECT * FROM Orders where Order_ID="+req.params.order_id+";"

    con.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            var ans={}
            ans["items"]=result;
            ans["total"] = result[0]["Total_Price"];
            console.log(result);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(ans));
            return;
        }
    })
});

module.exports = router;
