const graphql = require('graphql');
const Customer = require("../model/Customer");
const Owner = require("../model/Owner");
var bcrypt = require("bcrypt"); 
const saltRounds = 10;
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID

} = graphql;

const CustomerType = require('./typedefs/CustomerType');
const LoginType = require('./typedefs/LoginType');
const { argsToArgsConfig } = require('graphql/type/definition');

// const CustomerType = new GraphQLObjectType({
//     name: 'Customers',
//     fields:() => ({
//         email: {type: GraphQLString},
//         name: {type: GraphQLString},
//         city: {type: GraphQLString},
//         state: {type: GraphQLString},

//     })
// })

// const LoginType = new GraphQLObjectType({
//     name: 'loginuser',
//     fields:() => ({
//         email: {type: GraphQLString},
//         password: {type: GraphQLString}
//     })
// })

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {id: {type: GraphQLString}},
            async resolve(parent, args){
                console.log(args.id);
                // var result = 
                // console.log("results ", result);
                return await Customer.findOne({_id:args.id});
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
            address: ["null"],
            nickname: args.nickname,
        });
        console.log("new user ",user)
        const saveCus = await user.save();
        if(saveCus){
            // res.statusCode = 200;
            // res.setHeader("Content-Type","text/plain");
            // res.end("USER_ADDED");
            return {"status":"USER_ADDED"};
        }
    } catch(err){
        console.log("error ",err)
        // console.log(err);
        // res.statusCode = 500;
        // res.setHeader("Content-Type","text/plain");
        // res.end("Error in Data");
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

const status = new GraphQLObjectType({
    name: 'status',
    fields:() => ({
        status: {type: GraphQLString},
    })
})

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

        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
})