import axios from 'axios';
import jwt from 'jsonwebtoken'
import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN, 
  AUTH_ERROR,
  DASHBOARD_GET_DATA } from './types';

  export const signUp = data => {
    return async dispatch => {
      try {
        const res = await axios.post('http://localhost:3001/users/signup', data);
  
        dispatch({
          type: AUTH_SIGN_UP,
          payload: res.data.token
        });
  
        localStorage.setItem('JWT_TOKEN', res.data.token);
        axios.defaults.headers.common['Authorization'] = res.data.token;
      } catch(err) {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Email is already in use'
        })
      }
    };
  }
  
  // export const signOut = () => {
  //   return dispatch => {
  //     localStorage.removeItem('JWT_TOKEN');
  //     axios.defaults.headers.common['Authorization'] = '';
  //   };
  // }
  
  export const signIn = data => {
    return async dispatch => {
      try {
        console.log(data)
        //const res = await axios.post('http://localhost:3001/users/signin', data);
        await axios.post('http://localhost:3001/users/signin', data).then((res)=>{
          console.log(res)
          dispatch({
            type: AUTH_SIGN_IN,
            payload:{
              token:res.data.token,
              name:res.data.name,
              id:res.data.id
            }
          });
          localStorage.setItem('JWT_TOKEN', res.data.token);
          localStorage.setItem('name',res.data.name)
          localStorage.setItem('id',res.data.id)
          axios.defaults.headers.common['authorization'] = res.data.token;
        })
      } catch(err) {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Email and password combination isn\'t valid'
        })
      }
    };
  }
  
  export const getSecret = () => {
    return async dispatch => {
      try {
        const res = await axios.get('http://localhost:3001/users/secret')
        dispatch({
          type: DASHBOARD_GET_DATA,
          payload: res.data.user
        })
  
      } catch(err) {
        console.error('err', err)
      }
    }
  }
  
  export const signOut = () => {
    return dispatch => {
      localStorage.removeItem('JWT_TOKEN');
      localStorage.removeItem('name')
      localStorage.removeItem('id')
      axios.defaults.headers.common['Authorization'] = '';
  
      dispatch({
        type: AUTH_SIGN_OUT,
        payload: ''
      })
    };
  }
