import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
// import Form from 'components/Login/Form';
import LoginForm from 'styles/LoginForm';
import Overlay from 'styles/Overlay';
import Welcome from 'styles/Welcome';
import Form from 'components/Login/Form';
@connect(
  state => ({
    user: state.auth.user,
    isLogging: state.auth.loggingIn,
    loginError: state.auth.loginError
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
    sign: PropTypes.func,
    isLogging: PropTypes.bool,
    loginError: PropTypes.string
  }

  static defaultProps = {
    isLogging: false,
    loginError: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    const input2 = this.refs.password;
    this.props.login(input.value, input2.value);
    input.value = '';
    input2.value = '';
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
