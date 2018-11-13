import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { renderRoutes } from 'react-router-config';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
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
      name: '',
      email: '',
      text: ''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSendUser = this.handleSendUser.bind(this);
    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }

  handleChangeName(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }

  handleChangeMail(e) {
    this.setState({
      email: e.currentTarget.value
    });
  }

  handleChangeText(e) {
    this.setState({
      text: e.currentTarget.value
    });
  }


  handleSendUser() {
    event.preventDefault();
    const name = this.state.name.replace(/  +/g, '');
    const email = this.state.email.replace(/  +/g, '');
    const text = this.state.text.replace(/  +/g, '');

    if (name.length > 2) {
      axios.post('/api/sendUser', {
        name,
        email,
        text
      })
        .then(() => {
          this.setState({
            name: ''
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
