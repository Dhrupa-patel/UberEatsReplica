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
})

router.get("/restaurantprofile/:user_id", (req,res)=>{
    // console.log("profile res called",req.params);
    let sql = "SELECT * FROM Restaurants WHERE Res_ID='"+req.params.user_id+"'";
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
                let userObj = {"profile":{"Name":result[0].Res_Name, "Email_ID":result[0].Res_Email, "Description":result[0].Description,
            "Country":result[0].Country, "State":result[0].Res_State, "City":result[0].Res_City,
            "Timings":result[0].Timings,"Delivery_Type":result[0].Delivery_Type},"fileName":result[0].Res_ProfileImageLocation};
                res.end(JSON.stringify(userObj));
            }

        }
    });
});

router.post("/updatecustomerprofile", (req,res)=>{
    // console.log(req.body);
    let sql = "UPDATE Customers SET Cust_Email=?, Cust_DOB=?, Cust_City =?,"+
    "Cust_State=?, Cust_Country=?, Name=? WHERE Cust_ID =?";
    var values = [
        req.body.email, req.body.DOB, req.body.city, req.body.state,
        req.body.country, req.body.name, req.body.user_id];

    con.query(sql, values, (err,result)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            res.send("sucess");
        }
    })

})

router.get("/customerprofile/:user_id", (req,res)=>{
    // console.log("profile res called",req.params);
    let sql = "SELECT * FROM Customers WHERE Cust_ID='"+req.params.user_id+"'";
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
                let userObj = {"profile":{"Name":result[0].Name, "Email ID":result[0].Cust_Email,
            "Country":result[0].Cust_Country, "State":result[0].Cust_State, "City":result[0].Cust_City,
        "Date of Birth": result[0].Cust_DOB},"fileName":result[0].Cust_ProfileImageLocation};
                res.end(JSON.stringify(userObj));
            }

        }
    });
});

module.exports = router;