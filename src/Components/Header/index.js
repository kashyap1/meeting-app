import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import css from './index.module.css';
import CONSTANTS from '../../constants';
import { clearSessionCookie } from '../../Pages/CookieUtils';

const Header = function () {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

  const onLogOut = (e) => {
    e.preventDefault();
    clearSessionCookie(['id', 'userName']);
    dispatch({ type: CONSTANTS.actionTypes.USER_LOGGEDOUT });
  };

  const nav = isLoggedIn ? (
    <div className={css.nav__wrapper}>
      <Link to="/" className={css.nav}>Calendar</Link>
      <Link to="/meeting" className={css.nav}>Schedule Meeting</Link>
      <a href="/" onClick={onLogOut} className={css.nav}>Sign Out</a>
    </div>
  ) : null;

  return (
    <header className={css.header}>
      <div>Calendar App</div>
      {nav}
    </header>
  );
};

export default Header;
