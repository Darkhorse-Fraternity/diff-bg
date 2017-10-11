import React, {Component} from 'react';
import PropTypes from 'styled-props';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
// import Form from 'components/Login/Form';
import LoginForm from 'styles/LoginForm';
import Overlay from 'styles/Overlay';
import Welcome from 'styles/Welcome';

@connect(
  state => ({
    user: state.auth.user,
    isLogging: state.auth.loading,
    loginError: state.auth.error
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
    const {user, logout, isLogging} = this.props;
    return (
      <Overlay login>
        <Helmet title="登录"/>
        {!isLogging &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="输入账号" className="form-control"/>
              <input type="text" ref="password" placeholder="输入验证码" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
        </div>
        }
        {isLogging &&
          <LoginForm out>
            <Welcome
              user={user}
              username={'test'}
              onLogoutClick={logout}/>
          </LoginForm>
        }
      </Overlay>
    );
  }
}
