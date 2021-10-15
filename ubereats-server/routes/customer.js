const express = require("express")
const mysql = require("mysql");
const router = express.Router();
const axios = require("axios");
const url = "http://localhost:3002";

const con = mysql.createConnection({
    host:"ubereats.c15mrha1l62l.us-west-1.rds.amazonaws.com",
    user:"admin",
    password:"<password>",
    ssl: true,
    port: 3306,
    database:"UberEats",
  })
  
con.connect(function(err){
    if (err) throw err;
})

router.post("/addfavorites", (req,res)=>{
    // console.log("add to favorites", req.body)
    var sql = "INSERT INTO Favorites (Res_ID, Cust_ID) VALUES ("+req.body.res_id+","+req.body.Cust_id+")";
    con.query(sql, (err, result)=>{
        if(err){
            // console.log(err);
            res.send([]);
        }
        else{
            res.statusCode=200;
            res.setHeader("Content-Type","text/plain");
            res.end("success");
        }
    })
});

router.get("/getFavorites/:customerID", (req,res)=>{
    // console.log("called favorites", req.params);
    let sql = "SELECT Res_ID FROM Favorites WHERE Cust_ID ="+req.params.customerID;
    con.query(sql, async(err, result)=>{
        if(err){
            // console.log(err);
            res.send([]);
        }
        else{
            // console.log(result);
            var resids=[];
            for(i in result){
                if(! resids.includes(result[i].Res_ID)){
                    resids.push(result[i].Res_ID);
                }
            }
            let datas = await axios.get(`${url}/restaurants/getDetails/~/~/~`);
            // console.log(datas);
            let ans = [];
            for (idx in datas.data){
                if(resids.includes(datas.data[idx].Res_ID)){
                    await ans.push(datas.data[idx]);
                }
            }
            res.statusCode=200;
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(ans));
        }
    })
})

module.exports = router;
