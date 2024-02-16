import * as types from './actionTypes';
export const loadMonthlyDetailsStart = (usermonth) => {
  return {
    type:types.LOAD_MONTHLY_DETAILS_START,
    payload:{month : usermonth },
}};
export const loadMonthlyDetailsSuccess = (data) =>(
    {
    type:types.LOAD_MONTHLY_DETAILS_SUCCESS,
    payload: data,
});
export const loadMonthlyDetailsError = (error) =>({
    type:types.LOAD_MONTHLY_DETAILS_ERROR,
    payload: error,
});
export default {
    loadMonthlyDetailsStart,
}
