import React from 'react';
// import PropTypes from 'prop-types';
import './header.less';

const propTypes = {
};

const Header = () => {
  return (
    <div className='header'>
      <div className='header__container'>
        <div className='header__col header__leftCol'>
          <img className='header__logo' src='/images/geelLogo.svg' />
          <div className='header__position'>
            <img className='header__point' src='/images/pointMap.svg' />
             Москва
          </div>
        </div>
        <div className='header__col header__rightCol'>
          <div className='header__text'>
            ВХОД
          </div>
          <div className='header__text'>
            РЕГИСТРАЦИЯ
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = propTypes;
export default Header;
