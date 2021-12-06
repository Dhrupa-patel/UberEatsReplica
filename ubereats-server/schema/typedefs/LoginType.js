const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,

} = graphql;

const LoginType = new GraphQLObjectType({
    name: 'loginuser',
    fields:() => ({
        email: {type: GraphQLString},
        password: {type: GraphQLString}
    })
})


module.exports = LoginType