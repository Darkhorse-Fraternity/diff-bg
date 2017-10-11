import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import styled from 'styled-components';
export default class Home extends Component {
  render() {
    // const styles = require('./Home.scss');
    // require the logo image both from client and server

    const Content = styled.div`
        padding: 10rem;
        background-color: #1b6d85;
    `;

    const logoImage = require('./logo.png');
    return (
      <Content >
        <Helmet title="Home"/>
        <div >
          <div className="container">
            <div >
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>
          </div>
        </div>
      </Content>
    );
  }
}
