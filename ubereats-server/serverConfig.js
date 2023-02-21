const mysql = require("mysql");
const myPort = 3306;

const con = mysql.createConnection({
    host:"hostname",
    user:"admin",
    password:"password",
    ssl: true,
    port: myPort,
    database:"UberEats",
  })
  
con.connect(function(err){
    if (err) throw err;
    console.log("connected");
})

module.exports = con;

