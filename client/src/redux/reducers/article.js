import {
    CREATE_ARTICLE,
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_FAILED,
    UPDATE_ARTICLE,
    UPDATE_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_FAILED
  } from '../constants';
  
  const initialState = {
    fetching: false,
    error: ''
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case CREATE_ARTICLE:
        return {
          ...state,
          fetching: true
        };
  
      case CREATE_ARTICLE_SUCCESS:
        return {
          ...state,
          fetching: false,
        };
  
      case CREATE_ARTICLE_FAILED:
        return {
          ...state,
          fetching: false,
        };
  
      case UPDATE_ARTICLE:
        return {
          ...state,
          fetching: true
        };
  
      case UPDATE_ARTICLE_SUCCESS:
        return {
          ...state,
          fetching: false,
          error: ''
        };
  
      case UPDATE_ARTICLE_FAILED:
        return {
          ...state,
          fetching: false,
        };
  
      default:
        return state;
    }
  };