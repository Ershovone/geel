import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import axios from 'axios';
import { hot } from 'react-hot-loader';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import './norm.css';
import './fonts.css';
import './app.less';

const propTypes = {
  route: PropTypes.object
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className='app'>
        <Header />
        <div className='app__content'>
          {renderRoutes(this.props.route.routes)}
        </div>
      </div>
    );
  }
}

App.propTypes = propTypes;
export default hot(module)(withRouter(App));
