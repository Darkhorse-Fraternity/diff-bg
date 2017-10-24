/**
 * Created by lintong on 10/19/16.
 * @flow
 */
const LOAD = 'combo/req/LOAD';
const LOAD_SUCCESS = 'combo/req/LOAD_SUCCESS';
const LOAD_FAIL = 'combo/req/LOAD_FAIL';
import * as immutable from 'immutable';
import {registerReqKeys} from '../reqKeys';

const registerKeys = (keys = []) => {
  const newKyes = {};
  const loadState = {};
  keys.forEach((key) => {
    newKyes[key] = [];
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
      return state.merge({loadState, [action.key]: action.result});
    }
    case LOAD_FAIL: {
      const loadState = state.get('loadState').mergeDeep({
        [action.key]: {
          loading: false,
          loaded: false,
          error: action.error
        }
      });

      return state.mergeDeep({loadState});
    }

    case '@@INIT' :
      return initialState;

    default:
      return state;
  }
}


export function req(params, key) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.req(params).then(res => res.results || res),
    key
  };
}

// 做normalizr 做到一半，太累了，后面做
export function reqN(params, key) {
  return () => {
    return {
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: client => client.req(params).then(res => res.results || res),
      key
    };
  };
}
