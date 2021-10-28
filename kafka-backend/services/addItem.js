const mongoose = require("mongoose");
const mongo = require("./mongoose");

async function handle_request(msg, callback){
    var result = await mongo.Owners.findOne({_id:msg.Res_ID});
    var dish;
    dish = result.dishes.concat({
        "id":result.dish_id+1,
        "name": msg.Dish_Name,
        "price": msg.Dish_Price,
        "description": msg.Dish_Description,
        "ingredients": msg.Ingredients,
        "image": msg.imagelocation,
        "category": msg.Dish_Category
    });
    console.log(dish);
    var values = {
        _id: msg.Res_ID, 
        dishes:dish,
        dish_id: result.dish_id+1
    }
    
    var result = await mongo.Owners.findOneAndUpdate({_id: msg.Res_ID}, {$set:values}, {upsert:true})
    console.log(result);
    if(result){
        callback(null, "success");
    }
    else{
        callback(null, "Database Error");
    }
}

exports.handle_request = handle_request;