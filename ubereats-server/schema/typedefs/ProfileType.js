const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat

} = graphql;

const ProfileType = new GraphQLObjectType({
    name: 'profiletype',
    fields:() => ({
        Name: {type: GraphQLString},
        Email_ID: {type: GraphQLString},
        Country: {type: GraphQLString},
        State: {type: GraphQLString},
        City: {type: GraphQLString},
        Date_of_Birth: {type: GraphQLString},
        Description: {type: GraphQLString},
        Timings: {type: GraphQLString},
        Delivery_Type: {type: GraphQLString},
    })
})

const Profile = new GraphQLObjectType({
    name: 'profile',
    fields:() => ({
        profile: {type: ProfileType},
        Nickname: {type: GraphQLString},
        fileName: {type: GraphQLString},

    })
})

module.exports = Profile