/*eslint-disable */

/**
 * Created by lintong on 2016/11/6.
 * @flow
 */
'use strict';

import * as immutable from 'immutable';
import { normalize } from 'normalizr';
import { schemas, code } from '../scemes'
import { registerNormalizrKeys } from '../reqKeys'

const registerKeys = (keys = []) => {
  const newKyes = {}
  keys.forEach((key) => {
    newKyes[key] = {}
  })
  return newKyes
}

const initialState = immutable.fromJS({ ...registerKeys(registerNormalizrKeys) });

export const ADD_NORMALIZR = 'ADD_NORMALIZR'

export function addNormalizrEntity(key, data) {
  return dispatch => dispatch(addNormalizrEntities(key, { [code]: [data] }))
}


export function addNormalizrEntities(schemeOrkey, data) {
  if (!schemeOrkey || !data) {
    return
  }
  const scheme = typeof schemeOrkey === 'string' ? schemas[schemeOrkey] : schemeOrkey
  const nData = normalize(data, scheme)
  return dispatch => dispatch(addEntities(nData.entities))
}


export function addEntities(data: Object): Object {
  return dispatch => {
    return dispatch({
      type: ADD_NORMALIZR,
      payload: data,
    })
  }
}


export default function reducer(state = initialState, action: Object) {
  // console.log('state:', state.toJS(),action.type);
  switch (action.type) {

    case ADD_NORMALIZR: {

      // const { fromJS } = require('immutable')
      // const nested = fromJS({ a: { b: { d:{s:1,k:4}  } } })
      // const nested2 = nested.mergeDeep({ a: { b: {d:{s:2,m:3} } } })
      // console.log('nested2:', nested2.toJS());
      // { a: { b: { d:{s:2,m:3,k:4}  } } }  只会去覆盖 存在的属性，如eg

      return state.mergeDeep(action.payload)
    }

    case '@@INIT' :
      return initialState;

    default:
      return state
  }

}