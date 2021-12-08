const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat

} = graphql;

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields:() => ({
        dishId: {type: GraphQLInt},
        resID: {type: GraphQLString},
        dishName: {type: GraphQLString},
        quantity: {type: GraphQLString},
        dishPrice: {type: GraphQLString},
    })
})

const Orders = new GraphQLObjectType({
    name: 'Orders',
    fields:() => ({
        orders: {type: new GraphQLList(OrderType)},
        totalPrice: {type: GraphQLFloat},
        special_instructions: {type: GraphQLString}
    })
})

module.exports = Orders