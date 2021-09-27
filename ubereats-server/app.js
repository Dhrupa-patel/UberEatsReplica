
var express = require('express');
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


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Content-Type','application/json, text/plain')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get("/", (req,res)=>{
   console.log("hello world"); 
});


module.exports = app;
