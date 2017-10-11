import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

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

    return (
      <div >
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer to="/about">
                <NavItem eventKey={5}>About Us</NavItem>
              </LinkContainer>

              {!user &&
              <LinkContainer to="/login">
                <NavItem eventKey={6}>Login</NavItem>
              </LinkContainer>}
              {user &&
              <LinkContainer to="/logout">
                <NavItem eventKey={7} className="logout-link" onClick={this.handleLogout}>
                  Logout
                </NavItem>
              </LinkContainer>}
            </Nav>
            {user &&
            <p className={' navbar-text'}>Logged in as <strong>{user.name}</strong>.</p>}
            <Nav navbar pullRight>
              <NavItem eventKey={1} target="_blank" title="View on Github" href="https://github.com/erikras/react-redux-universal-hot-example">
                <i className="fa fa-github"/>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div >
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
