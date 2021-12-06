const graphql = require('graphql');
const Customer = require("../model/Customer");
var bcrypt = require("bcrypt"); 

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID

} = graphql;

const CustomerType = require('./typedefs/CustomerType');
const LoginType = require('./typedefs/LoginType');

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
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
})