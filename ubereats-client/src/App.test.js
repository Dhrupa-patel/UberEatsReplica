import Favorite from '@mui/icons-material/Favorite';
import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import OrderCustProfile from './components/Profile/OrderCustProfile';

it("renders without crashing",()=>{
  const div = document.createElement("div");
  ReactDOM.render(<OrderCustProfile/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
