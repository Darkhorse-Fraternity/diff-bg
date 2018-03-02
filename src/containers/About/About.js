import React, { Component } from 'react';
import Helmet from 'react-helmet';

const kitten = require('./kitten.jpg');

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>About Us</h1>
        <Helmet title="About Us" />
        <div>
          <img src={kitten} />
        </div>
      </div>
    );
  }
}
