const mongoose = require("mongoose");
const mongo = require("./mongoose");

async function handle_request(msg, callback){
    var result = await mongo.Orders.findOneAndUpdate({_id:msg.Order_ID},{$set:{orderStatus:msg.Order_Status}});     
    console.log("delete_item", result);
    if(result){
        callback(null, "success");
    }
    else{
        callback(null, "Database Error");
    }
}

exports.handle_request = handle_request;