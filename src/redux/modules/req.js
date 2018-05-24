/**
 * Created by lintong on 10/19/16.
 * @flow
 */
const LOAD = 'combo/req/LOAD';
const LOAD_SUCCESS = 'combo/req/LOAD_SUCCESS';
const LOAD_FAIL = 'combo/req/LOAD_FAIL';
import * as immutable from 'immutable';
import { registerReqKeys } from '../reqKeys';
import {addNormalizrEntity} from './normalizr'

const registerKeys = (keys = []) => {
  const newKyes = {};
  const loadState = {};
  keys.forEach((key) => {
    newKyes[key] = {};
    loadState[key] = {
      loading: false,
      loaded: false,
    };
  });
  newKyes.loadState = loadState;
  return newKyes;
};

const initialState = immutable.fromJS({
  loadState: {},
  ...registerKeys(registerReqKeys)
});
export default function reducer(state = initialState, action: Object) {
  // console.log('state:', state,action.type);
  switch (action.type) {
    case LOAD:
      return state.setIn(['loadState', action.key, 'loading'], true);
    case LOAD_SUCCESS: {

      const loadState = state.get('loadState').mergeDeep({
        [action.key]: {
          loading: false,
          loaded: true,
        }
      });
      return state.merge({ loadState, [action.key]: action.result });
    }
    case LOAD_FAIL: {
      const loadState = state.get('loadState').mergeDeep({
        [action.key]: {
          loading: false,
          loaded: false,
          error: action.error
        }
      });

      return state.mergeDeep({ loadState });
    }

    case '@@INIT' :
      return initialState;

    case '@@redux/INIT' :
      return initialState;

    default:
      return state;
  }
}


export function req(params, key) {
  return  (dispatch) => {
     return dispatch(reqN(params,key))
  }
}

export function reqN(params, key) {
  return async (dispatch) => {
    const res = await dispatch(load(params,key))
    dispatch(addNormalizrEntity(key,res))
    return res;
  };
}

export function load(params, key) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.req(params).then(res => res.results || res),
    key
  };
}


