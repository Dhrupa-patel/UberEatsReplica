import {gql} from 'apollo-boost';

const getDishes = `
query ($user_id: String!){
    getdishes(user_id:$user_id)
    {
      dishes{
        name
        id
        price
        description
        ingredients
        image
        category
      }
        res
    }
}`

const getOrders = `
query ($order_id: String!){
    getreceipt(order_id:$order_id)
    {
      orders{
        resID
        dishId
        dishName
        dishPrice
        quantity
      }
      totalPrice
      special_instructions
    }
}`

const getCustomerProfile = `
query ($user_id: String!){
    getCustomerProfile(user_id:$user_id)
    {
      profile {
        Name
        Email_ID
        Country
        State
        City
        Date_of_Birth
      }
      Nickname
      fileName
    }
}
`

const getRestaurantProfile = `
query ($user_id: String!){
    getRestaurantProfile(user_id: $user_id)
    {
        profile {
        Name
        Email_ID
        Country
        State
        City
        Timings
        Delivery_Type
        }
        fileName
    }
}
`



export {
    getDishes,
    getOrders,
    getCustomerProfile,
    getRestaurantProfile
} ;
// export default customerLogin;