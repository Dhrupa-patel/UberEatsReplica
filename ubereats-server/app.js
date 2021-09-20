
var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');
const cors = require('cors');
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(express.json());
// app.use(cors());

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
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Content-Type','application/json, text/plain')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get("/", (req,res)=>{
   console.log("hello world"); 
});

app.post("/login/customer", (req,res)=>{
  console.log("called", req.body);
  let userObj = {user_id:"1", name:"Dhrupa Patel", email:"dhrupa@gmail.com",password:"abc"};
  res.writeHead(200,{
    "Content-Type":"text/plain"
  })
  res.end(JSON.stringify(userObj));
});

app.post("/login/owner", (req,res)=>{
  console.log("called", req.body);
  let userObj = {user_id:"2", name:"XYZ", lastName:"patel", email:"dhrupa@gmail.com",password:"abc"};
  res.writeHead(200,{
    "Content-Type":"text/plain"
  })
  res.end(JSON.stringify(userObj));
});


app.post("/signup/customer", (req,res)=>{
  console.log("added customer", req.body);
 
  res.writeHead(200,{
    "Content-Type":"text/plain"
  })
  res.end("USER_ADDED");
});

app.post("/signup/owner", (req,res)=>{
  console.log("added owner", req.body);
 
  res.writeHead(200,{
    "Content-Type":"text/plain"
  })
  res.end("USER_ADDED");
});

app.post("/signup/owner", (req,res)=>{

  console.log("added signup");

});



module.exports = app;
