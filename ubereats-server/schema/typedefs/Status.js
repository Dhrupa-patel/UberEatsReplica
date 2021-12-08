const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,

} = graphql;

const status = new GraphQLObjectType({
    name: 'status',
    fields:() => ({
        status: {type: GraphQLString},
    })
})

module.exports = status