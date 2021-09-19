import "./App.css";
// import axiosInstance from './helper/axios';
import Main from "./components/Main";
import { BrowserRouter} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

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
      <div className="App">
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
