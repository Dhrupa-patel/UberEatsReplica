const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        required: true,
        min: 10,
        max:255,
    },

    password:{
        type: String,
        required: true,
        min: 6,
        max: 300,
    },

    name:{
        type: String,
        required: true,
        min: 6,
        max: 255,
    },

    city:{
        type: String,
        required: true,
    },

    state:{
        type: String,
        required: true,
    },

    country:{
        type: String,
        required: true,
    },

    phoneNumber:{
        type: String,
        required: true,
        min:9,
        max:10,
    },

    timings:{
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },

    menuCategory:{
        type: String,
        required: true
    },

    deliveryType:{
        type: Array,
        required: true,
    },

    dish_id:{
        type: Number,
        default:0
    },

    dishes:{
        type: Array,
    },

    images:{
        type: Array,
    }

});

module.exports = mongoose.model("Owner", userSchema);