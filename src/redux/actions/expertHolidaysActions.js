import * as types from './actionTypes';
//adding work experience details
export const createHolidayDetailsStart =  (users) =>({
    type:types.CREATE_HOLIDAYS_DETAILS_START,
    payload: users,
});
export const createHolidayDetailsSuccess =  () =>({
    type:types.CREATE_HOLIDAYS_DETAILS_SUCCESS,
});
export const createHolidayDetailsError = (error) =>({
    type:types.CREATE_HOLIDAYS_DETAILS_ERROR,
    payload: error,
});
//loading work experience details
export const loadHolidayDetailsStart = (pageno) =>{
    return {
        type:types.LOAD_HOLIDAYS_DETAILS_START,
        payload:{page : pageno },
    }
};
export const loadHolidayDetailsSuccess = (data) =>(
    {
    type:types.LOAD_HOLIDAYS_DETAILS_SUCCESS,
    payload: data,
});

export const loadHolidayDetailsError = (error) =>({
    type:types.LOAD_HOLIDAYS_DETAILS_ERROR,
    payload: error,
});
//deleting work experiencedetails
export const deleteHolidayDetailsStart = (userId) =>(
    {
    type:types.DELETE_HOLIDAYS_DETAILS_START,
    payload: userId,
});
export const deleteHolidayDetailsSuccess = (userId) =>({
    type:types.DELETE_HOLIDAYS_DETAILS_SUCCESS,
    payload: userId,
});
export const deleteHolidayDetailsError = (error) =>({
    type:types.DELETE_HOLIDAYS_DETAILS_ERROR,
    payload: error,
});
// //updating existing user details
export const updateHolidayDetailsStart = (id,userInfo) =>({
    //   console.log("actionData",id,userInfo)
    type:types.UPDATE_HOLIDAYS_DETAILS_START,
    payload: [id,userInfo],
});

export const  updateHolidayDetailsSuccess = () =>({
    type:types.UPDATE_HOLIDAYS_DETAILS_SUCCESS,
});
export const  updateHolidayDetailsError = (error) =>({
    type:types.UPDATE_HOLIDAYS_DETAILS_ERROR,
    payload: error,
});
export default {
    loadHolidayDetailsStart,
    createHolidayDetailsStart,
    updateHolidayDetailsStart,
}
