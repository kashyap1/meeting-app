import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCookies, clearSessionCookie } from '../CookieUtils';
import validateLogin from '../validator';
import CONSTANTS from '../../constants';
import css from './index.module.css';

const Login = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({ userName: '', password: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    clearSessionCookie(['id', 'userName']);
  }, []);

  const onChange = (e) => {
    const fields = { ...formFields, [e.target.name]: e.target.value };
    setFormFields(fields);
    return false;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validateLogin(formFields);
    setErrors(err);
    if (Object.keys(err).length) {
      return null;
    }
    const data = await fetch(`${CONSTANTS.BASE_URL}users?userName=${formFields.userName}`)
      .then((res) => res.json());
    const { id, userName, password } = data?.[0] || {};
    if (password === formFields.password) {
      setCookies([{ key: 'id', val: id }, { key: 'userName', val: userName }]);
      dispatch({ type: CONSTANTS.actionTypes.USER_LOGGEDIN, payload: { id, userName } });
      navigate('/');
    }
    return null;
  };

  return (
    <div className={css.login}>
      <form className={css.form}>
        <h2>Login Here</h2>
        <div className={css.row}>
          <input
            className={css.input}
            type="text"
            name="userName"
            value={formFields.userName}
            placeholder="User Name"
            onChange={onChange}
          />
          <div className={css.error}>{errors?.userName}</div>
        </div>
        <div className={css.row}>
          <input
            className={css.input}
            type="password"
            name="password"
            value={formFields.password}
            placeholder="Password"
            onChange={onChange}
          />
          <div className={css.error}>{errors?.password}</div>
        </div>
        <div className={css.row}>
          <input
            type="submit"
            value="Login"
            className={css.button__primary}
            onClick={onSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
