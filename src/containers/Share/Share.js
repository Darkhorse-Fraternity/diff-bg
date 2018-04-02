/**
 * Created by lintong on 2018/4/2.
 * @flow
 */
'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
const kitten = require('../About/kitten.jpg');

import {
    StyledContent,
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';


@connect(
    state => ({}),
    dispatch => ({})
)


export default class Share extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    render() {


        return (
            <StyledContent>
              <Helmet title="Share Us" />
              <h1>待完工~！</h1>
              <div>
                <img src={kitten} />
              </div>
            </StyledContent>
        );
    }
}


