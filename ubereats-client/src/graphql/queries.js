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



export {
    getCustomerProfile
} ;
// export default customerLogin;