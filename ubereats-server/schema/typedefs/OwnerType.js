const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,

} = graphql;

const OwnerType = new GraphQLObjectType({
    name: 'Owners',
    fields:() => ({
        email: {type: GraphQLString},
        name: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        _id: {type: GraphQLString},
        description: {type: GraphQLString},
        menuCategory: {type: GraphQLString},
        deliveryType: {type: GraphQLString},
        timings: {type: GraphQLString},
        images: {type: GraphQLString},
        country: {type: GraphQLString},
    })
})


module.exports = OwnerType