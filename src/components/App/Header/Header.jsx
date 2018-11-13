import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './header.less';

const propTypes = {
};

const Header = () => {
  return (
    <div className='header'>
      <div className='header__container'>
        <div className='header__col header__leftCol'>
          <Link to='/'>
            <img className='header__logo' src='/images/geelLogo.svg' />
          </Link>
          <div className='header__position'>
            <img className='header__point' src='/images/pointMap.svg' />
             Москва
          </div>
        </div>
        <div className='header__col header__rightCol'>
          <Link to='/login'>
            <div className='header__text'>
              ВХОД
            </div>
          </Link>
          <Link to='/reg'>
            <div className='header__text'>
              РЕГИСТРАЦИЯ
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = propTypes;
export default Header;
