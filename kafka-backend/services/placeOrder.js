const mongoose = require("mongoose");
const mongo = require("./mongoose");

async function handle_request(msg, callback){
    let dateObj = new Date()
    let date = dateObj.getFullYear()+"-"+dateObj.getMonth()+"-"+dateObj.getDate();
    let time = dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds();
    console.log("Special Instructions: ",msg.Special_Instruction)
    var values= {
        totalPrice: msg.price,
        order:msg.items,
        _id:msg.Order_ID,
        customerName: msg.Cust_Name,
        deliveryType: "New Order",
        orderStatus: "Order Recieved",
        orderMode: msg.orderMode,
        time: time,
        date: date,
        resId:msg.Res_ID,
        custId:msg.Cust_ID,
        special_instruct: msg.Special_Instruction,
        address: msg.Address
    }
    var result = await mongo.Customers.findOneAndUpdate({_id:msg.Cust_ID},{$addToSet: { address: msg.Address}});
    var result = await mongo.Orders.findOneAndUpdate({_id:msg.Order_ID},{$set:values},{upsert: true});
    console.log("place order");
    callback(null, "success");
}

exports.handle_request = handle_request;