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

router.post("/addItem", (req,res)=>{
    console.log(req.body);
    let sql = "INSERT INTO Cart (Dish_ID, Cust_ID, Res_ID, Dish_Name, Dish_price) VALUES (?,?,?,?,?)";
    let values = [req.body.Dish_ID, Number(req.body.Cust_ID), req.body.Res_ID, req.body.Dish_Name, req.body.Dish_Price];

    con.query(sql, values, (err, result)=>{
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

router.post("/removeitems", (req,res)=>{
    console.log(req.body);
    let sql = "DELETE FROM Cart WHERE Res_ID="+Number(req.body.Res_ID);

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
            res.end("Deleted");
            return;
        }
    })
});

router.get("/getItems/:cust_id/:res_id", (req,res)=>{
    console.log(req.params);
    let sql = "SELECT * FROM Cart WHERE Cust_ID ="+req.params.cust_id+" AND Res_ID="+req.params.res_id+";"

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
            res.end("got items");
            return;
        }
    })
})


module.exports = router;
