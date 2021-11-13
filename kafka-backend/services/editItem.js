const mongoose = require("mongoose");
const mongo = require("./mongoose");

async function handle_request(msg, callback){
    var result = await mongo.Owners.findOne({_id:msg.Res_ID})
    values = {
        id: msg.dishid,
        name: msg.dishname, 
        description: msg.description, 
        category: msg.category, 
        price: msg.price,
        ingredients: msg.ingredients,
        image: msg.image
    };

    if(result){
        for(var idx=0; idx<result.dishes.length; idx++){
            if (result.dishes[idx]["id"]===msg.dishid){
                result.dishes[idx] = values;
                break;
            }
        }
    }
    else{
        result = {dishes:values}
    }
    var result = await mongo.Owners.findOneAndUpdate({_id:msg.Res_ID},{$set:{dishes:result.dishes}},{upsert: true});
    // console.log("edit_item",result);
    if(result){
        callback(null, "success");
    }
    else{
        callback(null, "Database Error");
    }
}

exports.handle_request = handle_request;