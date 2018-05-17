import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import Helmet from 'react-helmet'
import { logout } from 'redux/modules/auth'
import { push } from 'react-router-redux'
import config from '../../config'
import { asyncConnect } from 'redux-connect'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import {
  StyledContent,
  StyledMain,
  StyledMenu,
  StyledPage
} from './style'
import FlatButton from 'material-ui/Button'

// @asyncConnect([{
//   key: 'admin',
//   promise: ({ store: {} }) => {
//     // const promises = [];
//
//     // if (!isInfoLoaded(getState())) {
//     //   promises.push(dispatch(loadInfo()));
//     // }
//     // if (!isAuthLoaded(getState())) {
//     //   promises.push(dispatch(loadAuth()));
//     // }
//
//     // return Promise.all(promises);
//     return Promise.resolve({ id: 1, name: 'Borsch' })
//   }
// }])
@connect(
  state => ({ user: state.auth.user }),
  { logout, pushState: push })

@immutableRenderDecorator

export default class Admin extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillReceiveProps(nextProps) {
    // if (!this.props.user && nextProps.user) {
    //   // login
    //   this.props.pushState('/')
    // } else if (this.props.user && !nextProps.user) {
    //   // logout
    //   this.props.pushState('/')
    // }
  }


  render() {
    const { user } = this.props
    return (
      <StyledContent>
        <Helmet {...config.app.head}/>
        <StyledMain>
          {user && <StyledMenu>
            <FlatButton component={Link} to={'/users'}>
              用户
            </FlatButton>

            <FlatButton component={Link} to={'/login'}>
              我的信息
            </FlatButton>
          </StyledMenu>}
          <StyledPage>
            {this.props.children}
          </StyledPage>
        </StyledMain>

        <div className="well text-center">
          footer <a
          href="http://icard.leanapp.cn/"
          target="_blank">design by tony</a>
        </div>
      </StyledContent>
    )
  }
}
