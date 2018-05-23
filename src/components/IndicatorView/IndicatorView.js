/**
 * Created by lintong on 2018/5/18.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';


import {
  StyledContent,
  StyledProgress
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { connect } from 'react-redux'



@connect(
  (state,props) => ({
    loadState: state.req.get('loadState').get(props.loadKey)
  }),
  (dispatch, props) => ({

  })
)

export default class IndicatorView extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

  }

  static propTypes = {
    loadKey:PropTypes.string.isRequired
  };
  static defaultProps = {};


  render() {


    // console.log('test:', '');

    return (
      <StyledContent>
        <StyledProgress />
      </StyledContent>
    );
  }
}


