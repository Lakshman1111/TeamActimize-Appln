import * as types from './actionTypes';
export const createAttendenceListDetailsStart =  (updatedData) =>{
    return {
    type:types.CREATE_ATTENDENCELIST_DETAILS_START,
    payload: updatedData,
}};
export const createAttendenceListDetailsSuccess =  () =>({
    type:types.CREATE_ATTENDENCELIST_DETAILS_SUCCESS,   
});
export const createAttendenceListDetailsError = (error) =>({
    type:types.CREATE_ATTENDENCELIST_DETAILS_ERROR,
    payload: error,
});
//loading Proficiency details
export const loadAttendenceListDetailsStart = (usermonth) => {
  return {
    type:types.LOAD_ATTENDENCELIST_DETAILS_START,
    payload:{date : usermonth },
}};
export const loadAttendenceListDetailsSuccess = (data) =>(
    {
    type:types.LOAD_ATTENDENCELIST_DETAILS_SUCCESS,
    payload: data,
});

export const loadAttendenceListDetailsError = (error) =>({
    type:types.LOAD_ATTENDENCELIST_DETAILS_ERROR,
    payload: error,
});
// //updating existing user details
export const updateAttendenceListDetailsStart = (updatedData, anyid) =>{
    return{
        type:types.UPDATE_ATTENDENCELIST_DETAILS_START,
        payload: { updatedData, anyid},
    }
};
export const  updateAttendenceListDetailsSuccess = () =>({
    type:types.UPDATE_ATTENDENCELIST_DETAILS_SUCCESS,  
});
export const  updateAttendenceListDetailsError = (error) =>({
    type:types.UPDATE_ATTENDENCELIST_DETAILS_ERROR,
    payload: error,
});
export default {
    createAttendenceListDetailsStart,
    loadAttendenceListDetailsStart,
    updateAttendenceListDetailsStart,
}