const express = require("express")
const mysql = require("mysql");
const router = express.Router();
// const con = require("../serverConfig");

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

router.get("/getDetails/:user_id", (req,res)=>{
    console.log("menu res called",req.params);
    let sql = "SELECT * FROM Dishes WHERE Res_ID='"+req.params.user_id+"'";
    con.query(sql, (err, result)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            if(result && result.length>0){
                res.statusCode = 200;
                res.setHeader("Content-Type","text/plain");
                console.log(result);
                res.end(JSON.stringify(result));
            }
        }
    });
});

router.post("/delete", (req,res)=>{
    console.log("delete item called",req.body);
    let sql = "DELETE FROM Dishes WHERE Dish_ID="+req.body.dish_id+"";
    console.log(sql);
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
            if(result && result.length>0){
                res.statusCode = 200;
                res.setHeader("Content-Type","text/plain");
                res.end("success");
            }
        }
    });
});
module.exports = router;