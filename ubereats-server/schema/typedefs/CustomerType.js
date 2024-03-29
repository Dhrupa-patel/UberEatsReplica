const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,

} = graphql;

const CustomerType = new GraphQLObjectType({
    name: 'Customers',
    fields:() => ({
        email: {type: GraphQLString},
        name: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        _id: {type: GraphQLString},
        dateOfBirth: {type: GraphQLString},
        country: {type: GraphQLString},
        nickname: {type: GraphQLString}
    })
})


module.exports = CustomerType