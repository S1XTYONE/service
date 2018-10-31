import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';


import reducers from './reducers';

const rootEl = document.getElementById('app');
const jwtToken = localStorage.getItem('JWT_TOKEN');
const name = localStorage.getItem('name');
const id = localStorage.getItem('id');
axios.defaults.headers.common['Authorization'] = jwtToken;

render(
    <Provider store={createStore(reducers, {
        auth: {
          id:id,
          name:name,
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false
        }
      }, applyMiddleware(reduxThunk))}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
, rootEl);

if (module.hot) {
    module.hot.accept();
}

