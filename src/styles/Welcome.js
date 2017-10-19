/*eslint-disable */

import React from 'react'
import styled from 'styled-components'
import CheckCircle from 'material-ui/svg-icons/action/check-circle'
import Button from '../styles/Button'
import Page from '../styles/Page'
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
const WelcomeDIV = styled.div`
  color: #03A9F4;
  box-sizing: border-box;
  width: 100%;
  padding: 15% 15% 10%;
  min-height: 120px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.5;
  & svg {
    height: 50px !important;
    width: 50px !important;
    fill: #8bc34a !important;
  }
`

const Welcome = ({user, username, onLogoutClick}) => (
  <WelcomeDIV>
    {/* <CheckCircle /> */}

              <Avatar
                  color={'#fff'}
                  backgroundColor={'#43c1ef'}
                  size={40}
                   >{username}
            </Avatar>

    <Page>
      {username}
      <br />
      <br />
      欢迎使用Combo!
    </Page>
    <Button
    fullWidth={true}
      bigger
      logout
      label='退出登录'
      onClick={(e) => {
        onLogoutClick()
      }}
    />
  </WelcomeDIV>
)

export default Welcome
