const graphql = require('graphql');
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
const Order = require("../model/Orders");
var bcrypt = require("bcrypt"); 
const saltRounds = 10;
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLFloat

} = graphql;

const CustomerType = require('./typedefs/CustomerType');
const LoginType = require('./typedefs/LoginType');
const status = require("./typedefs/Status");
const Dishes = require("./typedefs/DishType");
const ProfileType = require("./typedefs/ProfileType");
const Orders = require("./typedefs/OrderType");

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        getdishes: {
            type: Dishes,
            args:{
                user_id: {type: GraphQLString}
            },
            async resolve(parent, args){
                console.log("args called ",args);
                var result = await Owner.findOne({_id:args.user_id})
                console.log("get details",result);
                if(result){
                    if(result.dishes.length>0){
                        console.log(result);
                        var ans = await {"dishes":result.dishes,"res":result._id}
                        return ans;
                    }
                }
                else{
                    return {"dishes":[], "res":args.user_id};
                }
            }
        },

        getreceipt:{
            type: Orders,
            args:{
                order_id:{type: GraphQLString}
            },
            async resolve(parent, args){
                console.log("receipt args ", args);
                var result = await Order.find({_id:args.order_id});
                console.log("get details", result[0]);
                var ans = {"orders":[], "totalPrice":0.0, special_instructions:""}
                if(result){
                    ans["orders"] = result[0].order;
                    ans["totalPrice"] = result[0].totalPrice;
                    ans["special_instructions"] = result[0].special_instruct
                    console.log("ans ",ans);
                    return ans;
                }
                else{
                    return ans;
                }
            }
        },

        getCustomerProfile:{
            type: ProfileType,
            args:{
                user_id: {type: GraphQLString}
            },
            async resolve(parent, args){
                var result = await Customer.findOne({_id:args.user_id});
                // console.log(result);
                if(result){
                    let userObj = {"profile":{"Name":result.name, "Email_ID":result.email, "Country":result.country, "State":result.state, 
                    "City":result.city, "Date_of_Birth": result.dateOfBirth}, "Nickname": result.nickname, "fileName":result.image};
                    return userObj
                }
            }
        },

        getRestaurantProfile:{
            type:ProfileType,
            args:{
                user_id:{type: GraphQLString}
            },
            async resolve(parent, args){
                var result = await Owner.findOne({_id:args.user_id});
                console.log("called here ",result);
                if(result){
                    let userObj = {"profile":{"Name":result.name, "Email_ID":result.email, "Description":result.description,
                    "Country":result.country, "State":result.state, "City":result.city,
                    "Timings":result.timings,"Delivery_Type":result.deliveryType[0]||"None"},"fileName":result.images[0]};
                    // console.log(userObj);
                    return userObj

                }
            }
        }

    }
})

const queryforCustomerLogin = async(args)=>{
    console.log("args ", args);
    var result = await Customer.find({email:args.email});
    console.log("result", result);
    if(result){
        if(result.length>0){
            const encryptedPassword = await bcrypt.compare(
                args.password,
                result[0].password
              );
            console.log("encrypted password ", encryptedPassword);
            if(encryptedPassword){
                const payload = {
                    _id:result[0]._id,
                    name:result[0].name,
                    email:result[0].email,
                    location: result[0].city,
                    type:"customer"
                };
                let userObj = {_id:result[0]._id, name:result[0].name, state:result[0].city, email:result[0].email, password:args.password};
                
                return userObj;
            }
            else{
                return "INCORRECT PASSWORD";
            }
        }
        else{
            return "NO_USER";
        }
    }
}

const queryforOwnerLogin = async(args)=>{
    var result = await Owner.find({email:args.email});
    // console.log("result", result);
    if(result){
        if(result.length>0){
            const encryptedPassword = await bcrypt.compare(
                args.password,
                result[0].password
              );
            if(encryptedPassword){
                let userObj = {_id:result[0]._id ,name:result[0].name, state:result[0].state, email:result[0].email, password:result[0].password};
                return userObj;
            }
            else{
                return "INCORRECT PASSWORD";
            }
        }
        else{
            return "NO_USER";
        } 
    }  
}

const mutationforCustomerSignup = async(args)=>{
    try{
        // console.log("Customer signup", req.body);
        const hashPassword = await bcrypt.hash(args.password, saltRounds);
        var new_id = await Customer.countDocuments({})+1
        console.log("new id ",new_id)
        const user = new Customer({
            _id: "Cust"+ String(new_id),
            email: args.email,
            password: hashPassword,
            name: args.name,
            dateOfBirth: args.dateOfBirth,
            city: args.city,
            state: args.state,
            country: args.country,
            address: [args.address],
            nickname: args.nickname,
        });
        console.log("new user ",user)
        const saveCus = await user.save();
        if(saveCus){
            return {"status":"USER_ADDED"};
        }
    } catch(err){
        return {"status":"Error in Data"};
    }
}

const mutationforOwnerSignup = async(args)=>{
    try{
        const hashPassword = await bcrypt.hash(args.password, saltRounds);
        var new_id = await Owner.countDocuments({})+1
        console.log("new_id ",new_id)
        const user = new Owner({
            _id: "Res"+String(new_id),
            email: args.email,
            password: hashPassword,
            name: args.name,
            city: args.city,
            state: args.state,
            country: args.country,
            phoneNumber: args.phoneNumber,
            timings: "8:00 AM - 12:00 PM",
            description: args.description,
            menuCategory: args.menuCategory,
            deliveryType: args.deliveryType
        });
        console.log("usr ",user);
        const saveOwn = await user.save();
        if(saveOwn){
            return{"status":"USER_ADDED"};
        }
    } catch(err){
        console.log("errir",err)
        return {"status":"Database Error"};
    }
}

const queriesforAddDish = async(args)=>{
    var result = await Owner.findOne({_id:args.Res_ID});
    var dish;
    dish = result.dishes.concat({
        "id":result.dish_id+1,
        "name": args.name,
        "price": args.price,
        "description": args.description,
        "ingredients": args.ingredients,
        "image": args.image,
        "category": args.category
    });
    // console.log(dish);
    var values = {
        _id: args.Res_ID, 
        dishes:dish,
        dish_id: result.dish_id+1
    }
    
    var result = await Owner.findOneAndUpdate({_id: args.Res_ID}, {$set:values}, {upsert:true})
    // console.log(result);
    if(result){
        return {"status":"success"};
    }
    else{
        return {"status":"Database Error"};
    }
}

const mutationforAddToCart = async(args)=>{
    var values = {
        dishId: args.Dish_ID,
        resID: args.Res_ID,
        dishName: args.Dish_Name,
        quantity: args.Quantity,
        dishPrice: args.Dish_Price
    }
    var result = await Customer.findOne({_id:args.Cust_ID});
    if(result){
        result.cart = result.cart.concat(values);
        var result = await Customer.findOneAndUpdate({_id:args.Cust_ID},{$set: {cart:result.cart,cartResId:args.Res_ID}},{upsert: true});
        console.log("add_item_cart",result);
        if(result){
            return {"status":"success"};
        }
        else{
            return {"status":"Database Error"};
        }
    }
}

const mutationforPlaceOrder = async(args)=>{
    let dateObj = new Date()
    let date = dateObj.getFullYear()+"-"+dateObj.getMonth()+"-"+dateObj.getDate();
    let time = dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds();
    console.log("Special Instructions: ",args.Special_Instruction)
    var values= {
        totalPrice: args.price,
        order:args.items,
        _id:args.Order_ID,
        customerName: args.Cust_Name,
        deliveryType: "New Order",
        orderStatus: "Order Recieved",
        orderMode: args.orderMode,
        time: time,
        date: date,
        resId:args.Res_ID,
        custId:args.Cust_ID,
        special_instruct: args.Special_Instruction,
        address: args.Address
    }
    var result = await Customer.findOneAndUpdate({_id:args.Cust_ID},{$addToSet: { address: args.Address}});
    var result = await Order.findOneAndUpdate({_id:args.Order_ID},{$set:values},{upsert: true});
    console.log("place order");
    return {"status":"Order Placed"}
}

const mutationforUpdateStatus = async(args)=>{
    var result = await Order.findOneAndUpdate({_id:args.Order_ID},{$set:{orderStatus:args.Order_Status}});     
    // console.log("delete_item", result);
    if(result){
        return{"status":"success"};
    }
    else{
        return {"status":"Database Error"};
    }
}


const Mutations = new GraphQLObjectType({
    name: "Mutation",
    
    fields: {
        customerlogin:{
            type: CustomerType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                usertype: {type: GraphQLString}
            },
            async resolve(parent, args){
                console.log("args called",args);
                let result = await queryforCustomerLogin(args);
                console.log("results ",result);
                return result;
            }
        },

        ownerlogin:{
            type: CustomerType,
            args:{
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                usertype: {type: GraphQLString}   
            },
            async resolve(parent, args){
                console.log("args called",args);
                let result = await queryforOwnerLogin(args);
                console.log("results ",result);
                return result;
            }
        },

        customersignup: {
            type: status,
            args:{
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                city: {type: GraphQLString},  
                state: {type: GraphQLString}, 
                country: {type: GraphQLString},
                address: {type: GraphQLString},
                dateOfBirth: {type: GraphQLString},
                nickname: {type: GraphQLString},
                name: {type: GraphQLString}
            },
            async resolve(parent, args){
                console.log("signup customer ",args);
                let result = await mutationforCustomerSignup(args);
                console.log("signup login ",result);
                return result;
            }
        },

        ownersignup: {
            type: status,
            args:{
                email: {type: GraphQLString},
                password:  {type: GraphQLString},
                name:  {type: GraphQLString},
                city:  {type: GraphQLString},
                state:  {type: GraphQLString},
                country:  {type: GraphQLString},
                phoneNumber:  {type: GraphQLString},
                timings: {type: GraphQLString},
                description:  {type: GraphQLString},
                menuCategory:  {type: GraphQLString},
                deliveryType:  {type: GraphQLString}
            },
            async resolve(parent, args){
                console.log("signup owner ",args);
                let result = await mutationforOwnerSignup(args);
                console.log("signup after ",result);
                return result;
            }

        },

        additem: {
            type: status,
            args:{
                name: {type: GraphQLString},
                price: {type: GraphQLString},
                description: {type: GraphQLString},
                ingredients: {type: GraphQLString},
                image: {type: GraphQLString},
                category: {type: GraphQLString},
                Res_ID: {type: GraphQLString}
            },
            async resolve(parent, args){
                console.log("add item called ",args);
                let result = await queriesforAddDish(args);
                console.log("queries after ",result);
                return result
            }
        },

        addtocart: {
            type: status,
            args:{
                Dish_ID: {type: GraphQLString},
                Res_ID: {type: GraphQLString},
                Dish_Name: {type: GraphQLString},
                Quantity: {type: GraphQLString},
                Dish_Price: {type: GraphQLString},
                Cust_ID: {type: GraphQLString}
            },
            async resolve(parent, args){
                console.log("add to cart ",args);
                let result = await mutationforAddToCart(args);
                console.log("results ", result);
                return result
            }
        },

        // placeorder:{
        //     type: status,
        //     args:{
        //         price: {type: GraphQLFloat},
        //         items: [{
        //             dishId: {type: GraphQLInt},
        //             resID: {type: GraphQLString},
        //             dishName: {type: GraphQLString},
        //             quantity: {type: GraphQLString},
        //             dishPrice: {type: GraphQLString}
        //         }],
        //         Order_ID: {type: GraphQLString},
        //         Cust_Name: {type: GraphQLString},
        //         orderMode: {type: GraphQLString},
        //         Res_ID: {type: GraphQLString},
        //         Cust_ID: {type: GraphQLString},
        //         Special_Instruction: {type: GraphQLString},
        //         Address: {type: GraphQLString}
        //     },
        //     async resolve(parent, args){
        //         console.log("order placed called ",args);
        //         let result = await mutationforPlaceOrder(args);
        //         console.log("order placed ",result);
        //         return result
        //     }
        // },

        changestatus:{
            type: status,
            args:{
                Order_ID: {type: GraphQLString},
                Order_Status: {type: GraphQLString}
            },
            async resolve(parent, args){
                console.log("order status called ", args);
                let result = await mutationforUpdateStatus(args);
                console.log("status updated ", result);
                return result
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
})