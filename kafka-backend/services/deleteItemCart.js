const mongoose = require("mongoose");
const mongo = require("./mongoose");

async function handle_request(msg, callback){
    var result = await mongo.Customers.findOneAndUpdate({_id:msg.Cust_ID},{$unset: {cart:[]}});
    if(result){
        callback(null, "success");
    }
    else{
        callback(null, "Database Error");
    }
}

exports.handle_request = handle_request;