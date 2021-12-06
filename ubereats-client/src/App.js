import "./App.css";
// import axiosInstance from './helper/axios';
import Main from "./components/Main";
import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

const client = new ApolloClient({
  uri:'http://localhost:3002/graphql'

})
function App() { 

  // function login(userType) {
  //   axiosInstance.post('/setUserType', {user:userType
  //   }).then((response) => {
  //     console.log(response);
  //   });
  //   window.location = "./login.js"
  // };

  return (
    <Provider store = {store}>
    <ApolloProvider client={client}>
      <div className="App">
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    </ApolloProvider>
    </Provider>
  );
}

export default App;
