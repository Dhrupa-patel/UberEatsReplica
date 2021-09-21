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

router.post("/customer", (req,res)=>{
    console.log("Customer signup", req.body);
    var name = req.body.firstName+" "+req.body.lastName;
    let sql = "INSERT INTO Customers (Cust_Email, Cust_Password, Cust_DOB, Cust_City, Cust_State, Cust_Country,\
         Name, profileImage) VALUES (?)";
    
    var values = [req.body.email,req.body.password,"02/03/97",req.body.city,req.body.state,req.body.country,name,"None"];
    console.log("sql",sql);
    con.query(sql, [values], (err, result)=>{
        if(err){
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

    router.post("/owner", (req, res)=>{
        console.log("owner Signup", req.body);
        let sql = "INSERT INTO Restaurants (Res_Name, Res_State, Res_City, Phone_Number, Timings,\
            Res_Password, Country, Description, Res_Email) \
            VALUES (?)";
        
        var values = [req.body.name, req.body.state, req.body.city,
            "+916468307496","8:00-23:00",req.body.password, req.body.country,req.body.description,req.body.email];
    
        con.query(sql, (err, result)=>{
            if(err){
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
});

module.exports = router;