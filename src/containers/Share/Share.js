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
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar
} from 'material-ui';
import IndicatorView from '../../components/IndicatorView/IndicatorView'

const kitten = require('../About/kitten.jpg');

import {
  StyledContent,
  StyledIcardImage,
  StyledIcardDiv,
  StyledIcardSpan,
  StyledIcardP
} from './style'
import { req } from '../../redux/modules/req'
import { classNormalSearch, limitSearch } from '../../helpers/leanCloud'
import { shouldComponentUpdate } from 'react-immutable-render-mixin';
import { IUSE, ICARD, IDO } from '../../redux/reqKeys'
import { user as UserModle, iUse } from '../../helpers/LCModle'
import RecordRow from './RecordRow'

@connect(
  state => ({
    iUse: state.req.get(IUSE),
    loadState: state.req.get('loadState').get(IUSE).get('loading'),
    iDo: state.req.get(IDO)
  }),
  (dispatch, props) => ({
    load: async () => {
      const iUserId = props.location.query.id
      // const model = iUserModle(iUserId)
      const params = classNormalSearch(IUSE, iUserId, {
        include: 'iCard,iCard.user'
      })
      const res = await  dispatch(req(params, IUSE))
      const userId = res.user.objectId
      const iDoParams = limitSearch(IDO, 0, 20, {
        'where': {
          ...UserModle(userId),
          ...iUse(iUserId)
        }
      })
      dispatch(req(iDoParams, IDO))

    },

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


  _renderIdos = (data) => {

    return (
      <RecordRow key={data.createdAt} item={data}/>
    )

  }

  render() {


    const iUse = this.props.iUse.toJS()
    // const loadState = this.props.loadState
    // console.log('iUse:', iUse);


    if (!iUse.iCard) {
      return null
    }

    const { img, user } = iUse.iCard


    // console.log('iUse:', iUse);

    const dos = this.props.iDo && this.props.iDo.toJS()
    // console.log('dos:', dos);

    return (
      <StyledContent>
        <Helmet title={iUse.iCard.title}/>

          <StyledIcardDiv>
            <StyledIcardImage src={img.url}/>
            <StyledIcardSpan>
              <StyledIcardP>{iUse.iCard.title}</StyledIcardP>
              <StyledIcardP>{iUse.iCard.notifyText}</StyledIcardP>
            </StyledIcardSpan>
          </StyledIcardDiv>

          {dos && dos.map(item => this._renderIdos(item))}

      </StyledContent>
    );
  }
}


