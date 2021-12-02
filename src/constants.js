const BASE_URL = 'http://localhost:8000/';

const actionTypes = {
  USER_LOGGEDIN: 'USER_LOGGEDIN',
  USER_LOGGEDOUT: 'USER_LOGGEDOUT',
  MEETING_LOADED: 'MEETING_LOADED',
  MEETING_SAVE: 'MEETING_SAVE',
  MEETINGS_LOADED: 'MEETINGS_LOADED'
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default {
  BASE_URL,
  actionTypes,
  DAYS,
  MONTHS
};
