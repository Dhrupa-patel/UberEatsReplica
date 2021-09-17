
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
const cors = require('cors');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'cmpe_273_secure_string',
    resave: false,
    saveUninitialized: true
}));

// const con = mysql.createConnection({
//   host:"ubereats.c15mrha1l62l.us-west-1.rds.amazonaws.com",
//   user:"admin",
//   password:"Siddhi*5501",
//   ssl: true,
//   database:"UberEats",
// })

// con.connect(function(err){
//     if (err) throw err;
//     console.log("connected");

// })
app.get('/', (req,res)=>{
   console.log("hello world"); 
});

app.post("/setuser", (req,res)=>{
  console.log("log method called", req.body);
  if(!req.session.userType){
    req.session.userType = req.body.user;
  }
  res.send("Success");
})

module.exports = app;
