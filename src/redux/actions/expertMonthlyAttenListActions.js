import * as types from './actionTypes';
//loading Proficiency details
export const loadMonthlyAttendenceDetailsStart = (usermonth) => {
  return {
    type:types.LOAD_MONTHLYATTENDENCELIST_DETAILS_START,
    payload:{month : usermonth },
}};
export const loadMonthlyAttendenceDetailsSuccess = (data) =>(
    {
    type:types.LOAD_MONTHLYATTENDENCELIST_DETAILS_SUCCESS,
    payload: data,
});
export const loadMonthlyAttendenceDetailsError = (error) =>({
    type:types.LOAD_MONTHLYATTENDENCELIST_DETAILS_ERROR,
    payload: error,
});
export default {
    loadMonthlyAttendenceDetailsStart, 
}