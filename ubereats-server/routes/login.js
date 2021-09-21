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

router.post("/customer", (req,res)=>{
    console.log("Customer Login", req.body);
    let sql = "SELECT * FROM Customers WHERE Cust_Email='"+req.body.email+"'";
    console.log(sql);
    con.query(sql, (err, result)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        var results = JSON.stringify(result);
        if(result && result.length>0){
            if(req.body.password == result[0].Cust_Password){
                req.session.userEmailId = req.body.email;
                let userObj = {user_id:result[0].Cust_ID ,name:result[0].Name, email:result[0].Cust_Email, password:result[0].Cust_password};
                res.statusCode = 200;
                res.setHeader("Content-Type","text/plain");
                res.end(JSON.stringify(userObj));
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
    });

    router.post("/owner", (req, res)=>{
        console.log("owner Login", req.body);
        let sql = "SELECT * FROM Restaurants WHERE Res_Email='"+req.body.email+"'";
        con.query(sql, (err, result)=>{
            if(err){
                res.statusCode = 500;
                res.setHeader("Content-Type","text/plain");
                res.end("Database Error");
                return;
            }
            var results = JSON.stringify(result);
            if(result && result.length>0){
                if(req.body.password == result[0].Password){
                    req.session.userEmailId = req.body.email;
                    let userObj = {user_id:result[0].Res_ID ,name:result[0].Name, email:result[0].Res_Email, password:result[0].Res_Password};
                    res.statusCode = 200;
                    res.setHeader("Content-Type","text/plain");
                    res.end(JSON.stringify(userObj));
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
        })
    });
});

module.exports = router;