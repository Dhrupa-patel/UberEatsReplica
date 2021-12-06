import {gql} from 'apollo-boost';

const getCustomerProfile = `
query {
    customer(id: "Cust1"){
        email
        name
        city
        state
    }
}
`

export default getCustomerProfile;