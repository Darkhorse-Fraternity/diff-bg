/**
 * Created by lintong on 2018/5/18.
 * @flow
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';


import {
    StyledContent,
} from './style'

import { shouldComponentUpdate } from 'react-immutable-render-mixin';




export default class IndicatorView extends Component {
    constructor(props: Object) {
        super(props);
        this.shouldComponentUpdate = shouldComponentUpdate.bind(this);

    }

    static propTypes = {};
    static defaultProps = {};


    render(){

        return (
            <StyledContent>

            </StyledContent>
        );
    }
}


