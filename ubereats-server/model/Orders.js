const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },

    custId:{
        type: String,
        required: true
    },

    resID:{
        type: String,
        required: true,
    },

    order:{
        type: Array,
        required: true,
    },

    totalPrice:{
        type: Number,
        required: true,
    },

    time:{
        type: String,
        required: true,
    },

    date:{
        type: String,
        required: true,
    },

    customerName:{
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    restaurantName:{
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    deliveryType:{
        type: String,
        required: true,
        min:5,
    },

    orderStatus:{
        type: String,
        required: true
    },

    orderMode:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Orders", userSchema);