/**
 * Created by lintong on 2018/1/8.
 * @flow
 */
'use strict';

// import * as immutable from 'immutable';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import {
  StyledButton,
  StyledImage,
  StyledArrowView,
  StyledIcon,
  StyledBottom,
  StyledDateView,
  StyledNewTip,
  StyledDateText,
  StyledRecordText,
  StyledChatbtn,
  StyledChatBtnText,
  StyledImageDiv
} from './style'
//static displayName = RecordRow

export default class RecordRow extends Component {
  constructor(props: Object) {
    super(props);
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    navigation: PropTypes.object,
    showChat: PropTypes.bool,
    showImage: PropTypes.bool,
  };
  static defaultProps = {
    showChat: true,
    showImage: false,
  };


  // shouldComponentUpdate(nextProps: Object) {
  //     return !immutable.is(this.props, nextProps)
  // }

  chatBtnRef = 0
  _renderChatBtn = (item) => {
    const { commentNew, commentNum, user } = item

    return (
      <StyledChatbtn
        onPress={() => {
          this.props.navigation &&
          this.props.navigation.navigate('RComment', { data: item })
        }}>


        {commentNum > 0 &&
        (<StyledChatBtnText
          numberOfLines={1}>

          {item.commentNum}
        </StyledChatBtnText>)}
        <StyledArrowView/>
        {/*<Text style={[styles.tabLinkText,{color:focused?"#0093cb":'rgb(150,150,150)'}]}>{tabInfo.label}</Text>*/}
      </StyledChatbtn>
    )
  }

  _renderDone = () => {
    return (
      <StyledIcon color="primary">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
      </StyledIcon>
    )
  }

  render() {
    const { item, showImage } = this.props
    if (!item) return null
    const img = item.imgs && item.imgs[0] || null
    const date = moment(item.createdAt).format("YYYY-MM-DD HH:mm")
    return (
      <StyledButton
        style={this.props.style}>
        {!!item.recordText && item.recordText.length > 0 &&
        (<StyledRecordText numberOfLines={1}>
          {item.recordText}
        </StyledRecordText>)}
        {img && <StyledImageDiv>
          <StyledImage
            // easingFunc={Easing.bounce}
            src={img}/>
        </StyledImageDiv>}
        <StyledBottom>

          <StyledDateView>
            <StyledDateText>
              {date}
            </StyledDateText>
            {this._renderDone()}
          </StyledDateView>
        </StyledBottom>
      </StyledButton>
    );
  }
}

