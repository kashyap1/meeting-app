import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getCookie } from '../Pages/CookieUtils';
import CONSTANTS from '../constants';

export default function AuthRoute({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  let userName;
  let id;
  if (!user.id) {
    ({ id, userName } = getCookie());
    if (id) {
      dispatch({ type: CONSTANTS.actionTypes.USER_LOGGEDIN, payload: { id, userName } });
    }
  }

  if (!user.id && !id) {
    return (<Navigate to={{ pathname: '/login' }} />);
  }

  return children;
}
