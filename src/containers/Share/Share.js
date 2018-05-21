/**
 * Created by lintong on 2018/4/2.
 * @flow
 */
'use strict';

import React, { Component } from 'react';

import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { iUse as iUserModle } from '../../helpers/LCModle'
import { } from 'material-ui/';
import IndicatorView from '../../components/IndicatorView/IndicatorView'

const kitten = require('../About/kitten.jpg');

import {
  StyledContent,
} from './style'
import { req } from '../../redux/modules/req'
import { classNormalSearch } from '../../helpers/leanCloud'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { IUSE, ICARD } from '../../redux/reqKeys'

@connect(
  state => ({
    iUse: state.req.get(IUSE),
    loadState: state.req.get('loadState').get(IUSE).get('loading')
  }),
  (dispatch, props) => ({
    load: () => {
      const iUserId = props.location.query.id
      // const model = iUserModle(iUserId)
      const params = classNormalSearch(IUSE, iUserId, {
        include: 'iCard,iCard.user'
      })
      dispatch(req(params, IUSE))
      // client.req()
    }
  })
)


export default class Share extends Component {
  constructor(props: Object) {
    super(props);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }


  componentDidMount() {
    this.props.load()
  }

  render() {


    const iUse = this.props.iUse.toJS()
    const loadState = this.props.loadState
    console.log('iUse:', iUse);


    if(!iUse.iCard){

      return (<IndicatorView/>)
    }


    return (
      <StyledContent>
        <Helmet title="我的打卡记录"/>
        <h1>{iUse.iCard.title}</h1>
        <div>
          <img src={kitten}/>
        </div>
      </StyledContent>
    );
  }
}


