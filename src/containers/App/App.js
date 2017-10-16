import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';
import Helmet from 'react-helmet';
import {logout} from 'redux/modules/auth';
import {push} from 'react-router-redux';
import config from '../../config';
import {asyncConnect} from 'redux-async-connect';
import FlatButton from 'material-ui/FlatButton';

@asyncConnect([{
  promise: ({store: {}}) => {
    const promises = [];

    // if (!isInfoLoaded(getState())) {
    //   promises.push(dispatch(loadInfo()));
    // }
    // if (!isAuthLoaded(getState())) {
    //   promises.push(dispatch(loadAuth()));
    // }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    // const styles = require('./App.scss');
    // console.log('this.context:', this.context);

    return (
        <div>
          <Helmet {...config.app.head}/>

          <div>
            <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
              <FlatButton label="首页"/>
            </IndexLink>
            {user && (<Link
              to={"/users"}
              activeStyle={{color: '#33e0ff'}}
            >
              <FlatButton label="用户列表"/>
            </Link>)}
            <Link
              to={"/login"}
              activeStyle={{color: '#33e0ff'}}
            >
              <FlatButton label="登录"/>
            </Link>
          </div>
          <div>
            {this.props.children}
          </div>

          <div className="well text-center">
            footer <a
            href="http://lahuo.leanapp.cn/"
            target="_blank">design by tony</a>
          </div>
        </div>
    );
  }
}
