const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList

} = graphql;

const DishType = new GraphQLObjectType({
    name: 'Dish',
    fields:() => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        price: {type: GraphQLString},
        description: {type: GraphQLString},
        ingredients: {type: GraphQLString},
        image: {type: GraphQLString},
        category: {type: GraphQLString}
    })
})

const Dishes = new GraphQLObjectType({
    name: 'Dishes',
    fields:() => ({
        dishes: {type: new GraphQLList(DishType)},
        res: {type: GraphQLString}
    })
})

module.exports = Dishes