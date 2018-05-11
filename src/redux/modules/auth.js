const LOAD = 'combo/auth/LOAD';
const LOAD_SUCCESS = 'combo/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'combo/auth/LOAD_FAIL';
const LOGIN = 'combo/auth/LOGIN';
const LOGIN_SUCCESS = 'combo/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'combo/auth/LOGIN_FAIL';
const LOGOUT = 'combo/auth/LOGOUT';
const LOGOUT_SUCCESS = 'combo/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'combo/auth/LOGOUT_FAIL';

import config from '../../config';

import {requestUsersByMobilePhone} from '../../helpers/leanCloud';
const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };

    case '@@INIT' :
      return initialState;

    case '@@redux/INIT' :
      return initialState;
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(...args) {
  const params = requestUsersByMobilePhone(...args);
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client => client.req(params).then(res => {
      config.remoteHeader['X-LC-Session'] = res.sessionToken;
      return res;
    })
  };
}

export function sign(...args) {
  const params = requestUsersByMobilePhone(...args);
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client => client.req(params)
  };
}

export function logout() {
  // return {
  //   types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  //   promise: (client) => client.get('/logout')
  // };
  return {
    type: LOGOUT_SUCCESS,
    // promise: (client) => client.get('/logout')
  };
}

