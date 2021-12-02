import CONSTANTS from '../constants';
import initialState from './initialState';

export default (state = initialState, { type, payload }) => {
  const { USER_LOGGEDIN, USER_LOGGEDOUT } = CONSTANTS.actionTypes;
  switch (type) {
    case USER_LOGGEDIN:
      return {
        ...state.user,
        isLoggedIn: true,
        id: payload.id,
        userName: payload.userName
      };
    case USER_LOGGEDOUT:
      return {
        ...state.user,
        isLoggedIn: false,
        userName: null,
        id: null
      };
    default:
      return state;
  }
};
