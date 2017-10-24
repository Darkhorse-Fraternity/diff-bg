import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import {reducer as reduxAsyncConnect} from 'redux-connect';
import {immutableReducer as reduxAsyncConnect } from 'redux-connect';
// import * as immutable from 'immutable';
// Set the mutability/immutability functions
// setToImmutableStateFunc((mutableState) => immutable.fromJS(mutableState));
// setToMutableStateFunc((immutableState) => immutableState.toJS());

import load from './req';
import auth from './auth';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  req: load
});
