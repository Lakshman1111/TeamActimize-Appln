import * as types from './actionTypes';
export const loadCurrentWeekDetailsStart = () =>({
    type:types.LOAD_CURRENT_WEEK_DETAILS_START,
});
export const loadCurrentWeekDetailsSuccess = (data) => {
    return {
      type: types.LOAD_CURRENT_WEEK_DETAILS_SUCCESS,
      payload: data,
    };
  };
export const loadCurrentWeekDetailsError = (error) =>({
    type:types.LOAD_CURRENT_WEEK_DETAILS_ERROR,
    payload: error,
});