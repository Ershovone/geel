import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import './login.less';

const propTypes = {
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleChangeMail = (e) => this.setState({ email: e.currentTarget.value });
    this.handleChangePassword = (e) => this.setState({ password: e.currentTarget.value });
  }

  render() {
    return (
      <div className='login'>
        <div className='login__container'>
          ВХОД В ЛИЧНЫЙ КАБИНЕТ:
          <form name='myForm' method='post'>
            <p>E-mail: <input type='text' onChange={this.handleChangeMail} placeholder='Ваш mail'/></p>
            <p>Пароль: <input type='password' onChange={this.handleChangePassword}/></p>
            <input type='submit'/>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = propTypes;
export default Login;
