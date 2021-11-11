const mongoose = require("mongoose");
const mongo = require("./mongoose");

async function handle_request(msg, callback){
    var values = {
        dishId: msg.Dish_ID,
        resID: msg.Res_ID,
        dishName: msg.Dish_Name,
        quantity: msg.Quantity,
        dishPrice: msg.Dish_Price
    }
    var result = await mongo.Customers.findOne({_id:msg.Cust_ID});
    if(result){
        result.cart = result.cart.concat(values);
        var result = await mongo.Customers.findOneAndUpdate({_id:msg.Cust_ID},{$set: {cart:result.cart,cartResId:msg.Res_ID}},{upsert: true});
        console.log("add_item_cart",result);
        if(result){
            callback(null, "success");
        }
        else{
            callback(null, "Database Error");
        }
    }
}

exports.handle_request = handle_request;