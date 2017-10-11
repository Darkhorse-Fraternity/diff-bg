import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {


  render() {
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>About Us</h1>
        <Helmet title="About Us"/>
        <div><img src={kitten}/></div>
      </div>
    );
  }
}
