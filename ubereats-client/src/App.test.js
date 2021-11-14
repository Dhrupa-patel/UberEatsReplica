import Favorite from '@mui/icons-material/Favorite';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CustomerProfile from './components/Profile/CustomerProfile';

it("renders without crashing",()=>{
  const div = document.createElement("div");
  ReactDOM.render(<CustomerProfile/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
