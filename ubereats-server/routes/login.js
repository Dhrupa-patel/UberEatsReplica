const express = require("express")
const mysql = require("mysql");
const router = express.Router();
var bcrypt = require("bcrypt"); 
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
})

router.get("/customer", (req, res)=>{
    console.log("customer get API called");
    con.query("SELECT DISTINCT(Cust_Email) from Customers", (err, result)=>{
        if(err){
            res.send([]);
        }
        else{
            var emails = {"Emails":[]};
            for(let i=0; i<result.length;i++){
                emails["Emails"].push(result[i]["Cust_Email"]);
            }
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(emails));
        }
    })
});

router.post("/customer", (req,res)=>{
    // console.log("Customer Login", req.body);
    let sql = "SELECT * FROM Customers WHERE Cust_Email='"+req.body.email+"'";
    // console.log(sql);
    con.query(sql, async(err, result)=>{
        // console.log(err);
        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        if(result && result.length>0){
            // console.log(result[0])
            const encryptedPassword = await bcrypt.compare(
                req.body.password,
                result[0].Cust_Password
              );
            if(encryptedPassword){
                req.session.userEmailId = req.body.email;
                let userObj = {user_id:result[0].Cust_ID, name:result[0].Name, location:result[0].Cust_City, email:result[0].Cust_Email, password:req.body.password};
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
});
router.get("/owner", (req, res)=>{
    console.log("owner get API called");
    con.query("SELECT DISTINCT(Res_Email) from Restaurants", (err, result)=>{
        if(err){
            // console.log(err)
            res.send([]);
        }
        else{
            var emails = {"Emails":[]};
            for(let i=0; i<result.length;i++){
                emails["Emails"].push(result[i]["Res_Email"]);
            }
            // console.log(emails)
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(emails));
        }
    })
});

router.post("/owner", (req, res)=>{
    // console.log("owner Login", req.body);
    let sql = "SELECT * FROM Restaurants WHERE Res_Email='"+req.body.email+"'";
    con.query(sql, async(err, result)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        //var result = JSON.stringify(result);
        if(result && result.length>0){
            const encryptedPassword = await bcrypt.compare(
                req.body.password,
                result[0].Res_Password
              );
            if(encryptedPassword){
                req.session.userEmailId = req.body.email;
                let userObj = {user_id:result[0].Res_ID ,name:result[0].Res_Name, location:result[0].Res_State, email:result[0].Res_Email, password:result[0].Res_Password};
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

module.exports = router;