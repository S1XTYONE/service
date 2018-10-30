import { 
  AUTH_SIGN_UP, 
  AUTH_SIGN_OUT, 
  AUTH_SIGN_IN, 
  AUTH_ERROR } from '../api/types';

const DEFAULT_STATE = {
  isAuthenticated: false,
  token: '',
  errorMessage: '',
   name:'',
   id:''
}

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case AUTH_SIGN_UP:
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
    case AUTH_SIGN_IN:
      return { ...state, token: action.payload.token, isAuthenticated: true, errorMessage: '',name:action.payload.name,id:action.payload.id}
    case AUTH_SIGN_OUT:
      return { ...state, token: action.payload, isAuthenticated: false, errorMessage: '' }
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}