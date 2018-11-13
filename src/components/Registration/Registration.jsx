import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import MaskedInput from 'react-maskedinput';
import './registration.less';
import { validateName, validateEmail, validatePassword, validatePhone } from '../../libs/validate';


const propTypes = {
};

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      repPass: '',
      errors: [false, false, false, false, false]
    };

    this.handleChangeName = (e) => this.setState({ name: e.currentTarget.value });
    this.handleChangeMail = (e) => this.setState({ email: e.currentTarget.value });
    this.handleChangePhone = (e) => this.setState({ phone: e.currentTarget.value });
    this.handleChangePass = (e) => this.setState({ password: e.currentTarget.value });
    this.handleChangeRepPass = (e) => this.setState({ repPass: e.currentTarget.value });
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(e) {
    e.preventDefault();
    if (!validateName(this.state.name)) {
      this.setState({ errors: [true, false, false, false, false] });
      return null;
    }
    if (!validateEmail(this.state.email)) {
      this.setState({ errors: [false, true, false, false, false] });
      return null;
    }
    if (!validatePhone(this.state.phone)) {
      this.setState({ errors: [false, false, true, false, false] });
      return null;
    }
    if (!validatePassword(this.state.password)) {
      this.setState({ errors: [false, false, false, true, false] });
      return null;
    }
    if (!(this.state.password === this.state.repPass)) {
      this.setState({ errors: [false, false, false, false, true] });
      return null;
    }
    this.setState({ errors: [false, false, false, false, false] });

    axios.post('/register', {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password
    })
      .then(() => {
        console.warn('User added!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='registration'>
        <div className='registration__container'>
          СТРАНИЦА РЕГИСТРАЦИИ:
          <form name='myForm' method='post'>
            <p>
              Имя:
              <input type='text' onChange={this.handleChangeName} placeholder='Ваше имя'/>
              <span
                className={this.state.errors[0] ? 'registration__errMessage registration__errMessage-open'
                  : 'registration__errMessage'
                }
              >
                 Введите корректное имя
              </span>
            </p>
            <p>
              E-mail:
              <input type='text' onChange={this.handleChangeMail} placeholder='Ваш mail'/>
              <span
                className={this.state.errors[1] ? 'registration__errMessage registration__errMessage-open'
                  : 'registration__errMessage'
                }
              >
                 Введите корректный e-mail
              </span>
            </p>
            <p>
               Телефон:
              <MaskedInput
                type='tel'
                mask='+7(111)-111-11-11'
                onChange={this.handleChangePhone}
              />
              <span
                className={this.state.errors[2] ? 'registration__errMessage registration__errMessage-open'
                  : 'registration__errMessage'
                }
              >
                 Введите корректный телефон
              </span>
            </p>
            <p>
              Пароль:
              <input type='password' onChange={this.handleChangePass} />
              <span
                className={this.state.errors[3] ? 'registration__errMessage registration__errMessage-open'
                  : 'registration__errMessage'
                }
              >
                 Неверный формат пароля
              </span>
            </p>
            <p>
              Повторите пароль:
              <input type='password' onChange={this.handleChangeRepPass} />
              <span
                className={this.state.errors[4] ? 'registration__errMessage registration__errMessage-open'
                  : 'registration__errMessage'
                }
              >
                 Пароли не совпадают
              </span>
            </p>
            <input type='submit' onClick={this.handleRegister} />
          </form>
        </div>
      </div>
    );
  }
}

Registration.propTypes = propTypes;
export default Registration;
