var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority",
    {
        poolSize: 10,
    }
)
.then(
    () => {
        console.log("Mongoose is Connected");
    },
    (err) => {
        console.log("Mongoose is Not Connected"+ err);
    }
);

module.exports.Customers = mongoose.model( "Customer", {
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
    },

    cartResId:{
        type:String,
        default:null,
    }
});

module.exports.Orders = mongoose.model("Order", {
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

module.exports.Owners = mongoose.model("Owner", {
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