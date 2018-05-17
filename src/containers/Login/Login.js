
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
// import Form from 'components/Login/Form';
import LoginForm from 'styles/LoginForm';
import Overlay from './Overlay';
import Welcome from 'styles/Welcome';
import Form from 'components/Login/Form';
import { immutableRenderDecorator } from 'react-immutable-render-mixin';

@connect(
  state => ({
    user: state.auth.user,
    loginError: state.auth.error &&  state.auth.error.response.text
  }),
  authActions)
@immutableRenderDecorator
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    sign: PropTypes.func,
    loginError: PropTypes.string
  }

  static defaultProps = {
    loginError: ''
  }





  render() {
    const {user, logout} = this.props;
    return (
      <Overlay login>
        <Helmet title="登录"/>
        {!user && <Form
          {...this.props}
        />}
        {user &&
          <LoginForm out>
            <Welcome
              user={user}
              username={user.username}
              onLogoutClick={logout}/>
          </LoginForm>
        }
      </Overlay>
    );
  }
}
