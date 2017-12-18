import {
    GET_APPSTATE,
    GET_APPSTATE_SUCCESS,
    GET_APPSTATE_FAILED,
    UPDATE_APPSTATE,
    CHANGE_APP_LANGUAGE
  } from "../constants";
  
  const initialState = {
    data: [],
    error: null,
    fetching: false,
    language: 'ru',
    loggedIn: false,
    rawData: [],
    user: {},
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_APPSTATE:
        return {
          ...state,
          fetching: true
        };
  
      case GET_APPSTATE_SUCCESS:
        return {
          ...state,
          data: action.data,
          fetching: false,
          language: action.language,
          loggedIn: action.loggedIn,
          rawData: action.rawData,
          user: action.user,
        };
  
      case GET_APPSTATE_FAILED:
        return {
          ...state,
          fetching: false,
          error: action.error
        };
  
      case UPDATE_APPSTATE:
        return {
          ...state,
          loggedIn: action.loggedIn,
          user: action.user,
          language: action.language
        };
  
      case CHANGE_APP_LANGUAGE:
        return {
          ...state,
          language: action.language,
          data: action.data,
        };
  
      default:
        return state;
    }
  };