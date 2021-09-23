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

router.get("/getDetails", (req,res)=>{

    con.query("SELECT * from Restaurants", (err, result)=>{
        if(err){
            res.send([]);
        }
        else{
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(result));
        }
    })
});

module.exports = router;