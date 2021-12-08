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
    $address: String!,
    $dateOfBirth: String!,
    $nickname: String!,
    $name: String!
    )
    {
    customersignup(email: $email, 
        password: $password, 
        state:$state, 
        city:$city, 
        country: $country,
        address: $address,
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

const additem = `
mutation additem(
  $name: String!,
  $price: String!, 
  $description: String!,
  $ingredients: String!,
  $image: String!,
  $category: String!,
  $Res_ID: String!
  )
  {
  additem(name: $name, 
    price: $price, 
    description: $description,
    ingredients: $ingredients, 
    image: $image, 
    category: $category,
    Res_ID: $Res_ID,
      ){
      status
    }
}
`

const addtocart = `
mutation addtocart(
  $Dish_ID: String!,
  $Res_ID: String!,
  $Dish_Name: String!,
  $Quantity: String!,
  $Dish_Price: String!,
  $Cust_ID: String!
  )
  {
  addtocart(Dish_ID: $Dish_ID,
  Res_ID: $Res_ID,
  Dish_Name: $Dish_Name,
  Quantity: $Quantity,
  Dish_Price: $Dish_Price,
  Cust_ID: $Cust_ID
      ){
      status
    }
}
`

const changestatus = `
mutation changestatus(
  $Order_ID: String!,
  $Order_Status: String!
  )
  {
  changestatus(Order_ID: $Order_ID, 
      Order_Status: $Order_Status
      ){
      status
    }
}
`

export {
    ownerLogin,
    customerLogin,
    customersignup,
    ownersignup,
    additem,
    addtocart,
    changestatus
} ;