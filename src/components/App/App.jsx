import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { renderRoutes } from 'react-router-config';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router-dom';

const propTypes = {
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

  }

  render() {
    return (
      <div className='app'>APP!</div>
    );
  }
}

App.propTypes = propTypes;
export default hot(module)(withRouter(App));
