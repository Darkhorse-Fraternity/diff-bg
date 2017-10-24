/**
 * Created by lintong on 10/19/16.
 * @flow
 */
const LOAD = 'combo/req/LOAD';
const LOAD_SUCCESS = 'combo/req/LOAD_SUCCESS';
const LOAD_FAIL = 'combo/req/LOAD_FAIL';
import * as immutable from 'immutable';

const initialState = immutable.fromJS({
  loadState: {},
  users: [],
});
export default function reducer(state = initialState, action: Object) {
  switch (action.type) {
    case LOAD:
      // return {
      //   ...state,
      //   loadState: {
      //     ...state.loadState,
      //     [action.key]: {
      //       loading: true
      //     }
      //   },
      // };
      return state.setIn(['loadState', action.key, 'loading'], true);
    case LOAD_SUCCESS: {
// return {
      //   ...state,
      //   loadState: {
      //     ...state.loadState,
      //     [action.key]: {
      //       loading: false,
      //       loaded: true,
      //     }
      //   },
      //   [action.key]: action.result
      // };
      const loadState = state.get('loadState').mergeDeep({
        [action.key]: {
          loading: false,
          loaded: true,
        }
      });
      return state.merge({loadState, [action.key]: action.result});
    }
    case LOAD_FAIL: {
      // return {
      //   ...state,
      //   loadState: {
      //     ...state.loadState,
      //     [action.key]: {
      //       loading: false,
      //       loaded: false,
      //       error: action.error
      //     }
      //   },
      // };
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
    promise: client => client.req(params).then(res => res.results),
    key
  };
}

