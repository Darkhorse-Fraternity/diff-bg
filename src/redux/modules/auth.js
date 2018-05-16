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

import { requestUsersByMobilePhone, userMe } from '../../helpers/leanCloud';

const initialState = {
  loaded: false,
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
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


export function load(globalState) {

  if (__SERVER__) {
    return;
  }
  if (globalState && isLoaded(globalState)) {
    return;
  }

  const sessionToken = localStorage.sessionToken
  if (sessionToken) {
    config.remoteHeader['X-LC-Session'] = sessionToken;
    const params = userMe();
    return {
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
      promise: client => client.req(params)
    };

  }
}


export function login(...args) {
  const params = requestUsersByMobilePhone(...args);
  // console.log('login:', params);
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client => client.req(params).then(res => {
      config.remoteHeader['X-LC-Session'] = res.sessionToken;
      localStorage.sessionToken = res.sessionToken;
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
  localStorage.removeItem('sessionToken');
  return {
    type: LOGOUT_SUCCESS,
    // promise: (client) => client.get('/logout')
  };
}

