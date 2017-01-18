import * as immutable from 'immutable';

const LOAD = 'leancloud/LOAD';
const LOAD_SUCCESS = 'leancloud/LOAD_SUCCESS';
const LOAD_FAIL = 'leancloud/LOAD_FAIL';

const initialState = immutable.fromJS({});

export default function leancloud(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return state.setIn([action.key, 'loading'], true);
    case LOAD_SUCCESS:
      return immutable.fromJS({
        ...state,
        [action.key]: {
          loading: false,
          data: action.result
        }
      });
    case LOAD_FAIL:
      return state.setIn([action.key, 'loading'], true).setIn([action.key, 'error'], action.error);
    default:
      return immutable.fromJS(state);
  }
}

export function load(params, key) {
  if (typeof params.method !== 'string' || typeof params.path !== 'string') {
    console.error('load参数错误:', params);
  }

  if (typeof key !== 'string') {
    console.error('load key错误:', key);
  }

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    key,
    promise: (client) => client[params.method](params.path, {'lc': true})
  };
}
