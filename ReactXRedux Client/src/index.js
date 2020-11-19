import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware,createStore } from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux"; 
import UserReducer from "./reducers/UserReducer" 
  
 
const  store = createStore(UserReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
 
reportWebVitals();
