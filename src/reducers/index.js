import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import meeting from './meeting';

export default combineReducers({
  user,
  meeting,
  router: routerReducer
});
