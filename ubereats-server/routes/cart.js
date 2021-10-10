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
    let sql = "DELETE FROM Cart WHERE "+req.body.type+"="+Number(req.body[req.body.type]);

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

router.get("/getItems/:cust_id", (req,res)=>{
    console.log(req.params);
    let sql = "SELECT * FROM Cart WHERE Cust_ID ="+req.params.cust_id+";"

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

router.get("/getCartResID/:cust_id", (req,res)=>{
    console.log(req.params,"called in get cart res");
    let sql = "SELECT DISTINCT(Res_ID) FROM Cart WHERE Cust_ID ="+req.params.cust_id+";"

    con.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            ans = []
            for (var i in result){
                ans.push(result[i].Res_ID);
            }
            console.log(ans);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(ans));
            return;
        }
    })
});
router.get("/Order/:cust_id", (req,res)=>{
    console.log(req.params);
    let sql = "SELECT * FROM Cart WHERE Cust_ID ="+req.params.cust_id+";"

    con.query(sql, async(err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            console.log(result);
            console.log(result);
            var ans = {"items":result}
            var total=0;
            for(var idx in result){
                total=total+result[idx]["Dish_Price"];
            }
            ans["total"] = total;
            console.log(ans)
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end(JSON.stringify(ans));
            return;
        }
    })
});

router.post("/placeorder", (req,res)=>{
    console.log(req.body);
    let sql = "INSERT INTO Orders (Order_ID, Cust_ID, Cust_Name, Dish_Name, Delivery_type, Order_Status, Total_Price, Order_Mode, Res_ID, Order_Date, Order_Time)"+
    "Values ";
    let dateObj = new Date()
    let date = dateObj.getFullYear()+"-"+dateObj.getMonth()+"-"+dateObj.getDate();
    let time = dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds();
    console.log(date,time);
    values = [];
    for(idx in req.body.items){
        sql = sql.concat("(?),");
        values.push([req.body.Order_ID,req.body.items[idx]["Cust_ID"], req.body.Cust_Name, req.body.items[idx]["Dish_Name"],'New Order','Order Recieved',req.body.price,'Pickup', req.body.items[idx]["Res_ID"], date, time]);
    }
    console.log(values);
    sql = sql.substring(0,sql.length-1);
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
            res.end("Placed the order");
            return;
        }
    })
});




module.exports = router;
