import "./App.css";
// import axiosInstance from './helper/axios';
import Main from "./components/Main";
import { BrowserRouter} from "react-router-dom";

function App() { 

  // function login(userType) {
  //   axiosInstance.post('/setUserType', {user:userType
  //   }).then((response) => {
  //     console.log(response);
  //   });
  //   window.location = "./login.js"
  // };

  return (
    <div className="App">
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
