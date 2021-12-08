import {gql} from 'apollo-boost';

const getCustomerProfile = `
query($id: String!){
    customer(id: $id){
        email
        name
        city
    }
}
`

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


export {
    getCustomerProfile,
    getDishes
} ;
// export default customerLogin;