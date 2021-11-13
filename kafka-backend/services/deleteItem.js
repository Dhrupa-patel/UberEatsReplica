const mongoose = require("mongoose");
const mongo = require("./mongoose");

async function handle_request(msg, callback){
    var result = await mongo.Owners.findOne({_id:msg.Res_ID})
    var index = null;
    if(result){
        for(var idx=0; idx<result.dishes.length; idx++){
            if (result.dishes[idx].id===msg.dishid){
                index = idx;
                break;
            }
        }
        if(index!==null){
            result.dishes.splice(idx,1);
        }
    }
    var result = await mongo.Owners.findOneAndUpdate({_id:msg.Res_ID},{$set:{dishes:result.dishes}}, {upsert: true});
    // console.log("delete_item", result);
    if(result){
        callback(null, "success");
    }
    else{
        callback(null, "Database Error");
    }
}

exports.handle_request = handle_request;