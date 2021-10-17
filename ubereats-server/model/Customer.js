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

    dateOfBirth:{
        type:String,
        required: true,
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

    address:{
        type: Array,
        required: true,
    },

    nickname:{
        type: String,
        required: true,
        min:5,
    },

    image:{
        type: String
    },

    favorites:{
        type:Array,
    },

    cart:{
        type:Array,
    }
});

module.exports = mongoose.model("Customers", userSchema);