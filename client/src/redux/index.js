import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import app from './reducers/app';
import auth from './reducers/auth';
import article from './reducers/article';

export default combineReducers({
  routing: routerReducer,
  app,
  auth,
  article,
})