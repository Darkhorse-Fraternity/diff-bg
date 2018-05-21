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
  StyledMenu,
  StyledPage,
  StyledMain
} from './style'
import FlatButton from 'material-ui/Button'

@asyncConnect([{
  key: 'app',
  promise: ({ store: {} }) => {
    // const promises = [];

    // if (!isInfoLoaded(getState())) {
    //   promises.push(dispatch(loadInfo()));
    // }
    // if (!isAuthLoaded(getState())) {
    //   promises.push(dispatch(loadAuth()));
    // }

    // return Promise.all(promises);
    return Promise.resolve({ id: 1, name: 'Borsch' })
  }
}])
@connect(
  state => ({ user: state.auth.user }),
  { logout, pushState: push })

@immutableRenderDecorator

export default class App extends Component {
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
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/')
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/')
    }
  }

  // contextTypes: {
  //   router: routerShape
  // }

  handleLogout = (event) => {
    event.preventDefault()
    this.props.logout()
  }

  // activity = (toLocation, onlyActiveOnIndex) =>{
  //   const router = this.context.router;
  //   return router.isActive(toLocation, onlyActiveOnIndex);
  // };

  render() {
    // console.log('props:', this.props);
    const { user } = this.props
    // const styles = require('./App.scss');
    // console.log('this.context:', this.context);

    return (
      <StyledContent>


        <StyledMain>
          <Helmet {...config.app.head}/>
          <StyledMenu>
            <FlatButton component={IndexLink} to={'/'}>
              首页
            </FlatButton>

            <FlatButton component={Link} to={'/about'}>
              关于我们
            </FlatButton>
          </StyledMenu>
          <StyledPage>
            {this.props.children}
          </StyledPage>

          <div>
            footer <a
            href="http://icard.leanapp.cn/"
            target="_blank">design by tony</a>
          </div>
        </StyledMain>


      </StyledContent>
    )
  }
}
