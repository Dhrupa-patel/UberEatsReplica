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

router.get("/getDetails/:location/:deliveryType", (req,res)=>{
    console.log("called here",req.params);
    let sql = null;
    if(req.params.location==="~"){
        sql = "SELECT * from Restaurants";
    }
    else{
        sql = "SELECT * from Restaurants WHERE Res_State = '"+req.params.location+"' && Delivery_Type = '"+req.params.deliveryType+"'";
    }
    console.log(sql)
    con.query(sql, (err, result)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end([]);
        }
        else{
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(result));
        }
    })
});

module.exports = router;