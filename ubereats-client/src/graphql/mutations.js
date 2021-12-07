const customerLogin = `mutation($email: String!, $password: String!, $usertype: String!){
    customerlogin(email: $email, password: $password, usertype: $usertype){
          email
          _id
          state
          name
      }
  }
`

const ownerLogin = `mutation($email: String!, $password: String!, $usertype: String!){
    ownerlogin(email: $email, password: $password, usertype: $usertype){
          email
          _id
          state
          name
      }
  }
`

const customersignup = `
mutation customersignup(
    $email: String!,
    $password: String!, 
    $city: String!,
    $state: String!,
    $country: String!,
    $dateOfBirth: String!,
    $nickname: String!,
    $name: String!
    )
    {
    customersignup(email: $email, 
        password: $password, 
        state:$state, 
        city:$city, 
        country: $country
        dateOfBirth: $dateOfBirth,
        nickname: $nickname,
        name: $name
        ){
          status
      }
  }
`

const ownersignup = `
mutation ownersignup(
    $email: String!,
    $password: String!, 
  	$name: String!,
    $city: String!,
    $state: String!,
    $country: String!,
    $phoneNumber: String!,
  	$timings: String!
    $description: String!,
    $menuCategory: String!,
  	$deliveryType: String!
    )
    {
    ownersignup(email: $email, 
        password: $password, 
      	name:$name,
        state:$state, 
        city:$city, 
        country: $country,
        phoneNumber: $phoneNumber,
        timings: $timings,
        description: $description,
      	menuCategory: $menuCategory,
      	deliveryType: $deliveryType
        ){
            status
        }
    }
`
export {
    ownerLogin,
    customerLogin,
    customersignup,
    ownersignup
} ;