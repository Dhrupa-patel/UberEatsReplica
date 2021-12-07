const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,

} = graphql;

const UserType = new GraphQLObjectType({
    name: 'OwnerType',
    fields:() => ({
        email: {type: GraphQLString},
        name: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        _id: {type: GraphQLString},
        password: {type: GraphQLString},
        dateOfBirth: {type: GraphQLString},
        country: {type: GraphQLString},
        address: {type: GraphQLString},
        nickname: {type: GraphQLString},
    })
})


module.exports = UserType