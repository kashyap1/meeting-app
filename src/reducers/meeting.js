import CONSTANTS from '../constants';
import initialState from './initialState';

const meeting = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.actionTypes.MEETINGS_LOADED:
      return {
        ...state.meeting,
        ...action.payload
      };
    default:
      return state;
  }
};

export default meeting;
