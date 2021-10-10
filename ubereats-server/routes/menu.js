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
})

router.get("/getDetails/:user_id", (req,res)=>{
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
                // console.log(result);
                res.end(JSON.stringify(result));
            }
        }
    });
});

router.post("/delete", (req,res)=>{
    // console.log("delete item called",req.body);
    let sql = "DELETE FROM Dishes WHERE Dish_ID="+req.body.dish_id+"";
    // console.log(sql);
    con.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            // console.log(result);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("success");
        }
    });
});

router.get("/getRestaurantIDs/:search", (req, res)=>{
    // console.log("called resIDS", req.params);
    let sql = "SELECT DISTINCT(Res_ID) FROM Dishes WHERE Dish_Name LIKE '"+req.params.search+"%' OR Location LIKE '"+req.params.search+"%' OR Restaurant_Name LIKE '"+req.params.search+"%'";
    // console.log(sql);
    con.query(sql, (err, result)=>{
        if(err){
            console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            if(result && result.length>0){
                res.statusCode = 200;
                res.setHeader("Content-Type","text/plain");
                res.end(JSON.stringify(result));
            }
            else{
                res.statusCode = 200;
                res.setHeader("Content-Type","text/plain");
                res.end("No_ENTRY_FOUND");
            }
        }
    });
});

router.post("/additem", (req,res)=>{
    // console.log("add item called",req.body);
    let sql = "INSERT INTO Dishes (Res_ID, Dish_Name, Dish_Description, Dish_Category, Restaurant_Name, Dish_Price, Ingredients, Location,"+
    "Dish_ProfileName, Dish_ProfileImageLocation) Values (?)";
    values = [req.body.Res_ID, req.body.Dish_Name, req.body.Dish_Description, req.body.Dish_Category, req.body.Restaurant_Name,
    req.body.Dish_Price, req.body.Ingredients, req.body.Location, req.body.imagename, req.body.imagelocation];
    // console.log(sql);
    con.query(sql, [values] , (err, result)=>{
        if(err){
            // console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            // console.log(result);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("success");
        }
    });
});
router.post("/edititem", (req,res)=>{
    // console.log("edit item called",req.body);
    let sql = "UPDATE Dishes SET Dish_Name=?, Dish_Description=?, Dish_Category=?, Dish_Price=?, Ingredients=? WHERE Dish_ID=?";
    values = [req.body.dishname, req.body.description, req.body.category, req.body.price,
    req.body.ingredients,Number(req.body.dishid)];
    // console.log(sql);
    con.query(sql, values , (err, result)=>{
        if(err){
            // console.log(err);
            res.statusCode = 500;
            res.setHeader("Content-Type","text/plain");
            res.end("Database Error");
            return;
        }
        else{
            // console.log(result);
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("success");
        }
    });
});


module.exports = router;