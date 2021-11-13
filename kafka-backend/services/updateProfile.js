const mongoose = require("mongoose");
const mongo = require("./mongoose");

async function handle_request(msg, callback){
    if(msg.type==="customer"){
        var result = await mongo.Customers.findOneAndUpdate({_id:msg.user_id},{$set:msg.values},{upsert:true});
    }
    else{
        var result = await mongo.Owners.findOneAndUpdate({_id:msg.user_id}, {$set:msg.values}, {upsert: true});
    }
    console.log("update profile", result);
    if(result){
        callback(null, "success");
    }
    else{
        callback(null, "Database Error");
    }
}

exports.handle_request = handle_request;