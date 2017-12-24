import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED
  } from '../constants';
  
  const initialState = {
    fetching: false,
    loggedIn: false,
    error: ''
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          fetching: true
        };
  
      case LOGIN_SUCCESS:
        return {
          ...state,
          fetching: false,
          loggedIn: action.loggedIn,
          error: ''
        };
  
      case LOGIN_FAILED:
        return {
          ...state,
          fetching: false,
          error: action.error
        };
  
      case LOGOUT:
        return {
          ...state,
          fetching: true
        };
  
      case LOGOUT_SUCCESS:
        return {
          ...state,
          fetching: false,
          loggedIn: false,
          error: ''
        };
  
      case LOGOUT_FAILED:
        return {
          ...state,
          fetching: false,
          error: action.error
        };
  
      default:
        return state;
    }
  };