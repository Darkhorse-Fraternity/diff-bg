import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import load from './req';
import auth from './auth';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  req: load
});
