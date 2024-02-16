import * as types from './actionTypes';
//adding emergency details
export const createEventmanDetailsStart =  (users) =>({
    type:types.CREATE_EVENTMAN_DETAILS_START,
    payload: users,
});
export const createEventmanDetailsSuccess =  () =>({
    type:types.CREATE_EVENTMAN_DETAILS_SUCCESS,
});
export const createEventmanDetailsError = (error) =>({
    type:types.CREATE_EVENTMAN_DETAILS_ERROR,
    payload: error,
});
//loading work experience details
export const loadEventmanDetailsStart = (pageno) =>({
    type:types.LOAD_EVENTMAN_DETAILS_START,
    payload:{page : pageno },
});
export const loadEventmanDetailsSuccess = (data) =>(
    {
    type:types.LOAD_EVENTMAN_DETAILS_SUCCESS,
    payload: data,
});
export const loadEventmanDetailsError = (error) =>({
    type:types.LOAD_EVENTMAN_DETAILS_ERROR,
    payload: error,
});
//deleting work experiencedetails
export const deleteEventmanDetailsStart = (userId) =>(
    {
    type:types.DELETE_EVENTMAN_DETAILS_START,
    payload: userId,
});

export const deleteEventmanDetailsSuccess = (userId) =>({
    type:types.DELETE_EVENTMAN_DETAILS_SUCCESS,
    payload: userId,
});
export const deleteEventmanDetailsError = (error) =>({
    type:types.DELETE_EVENTMAN_DETAILS_ERROR,
    payload: error,
});
// //updating existing user details
export const updateEventmanDetailsStart = (id,userInfo) =>({
    type:types.UPDATE_EVENTMAN_DETAILS_START,
    payload: [id,userInfo],
});
export const  updateEventmanDetailsSuccess = () =>({
    type:types.UPDATE_EVENTMAN_DETAILS_SUCCESS,   
});
export const  updateEventmanDetailsError = (error) =>({
    type:types.UPDATE_EVENTMAN_DETAILS_ERROR,
    payload: error,
});
export default {
    loadEventmanDetailsStart,
    deleteEventmanDetailsStart,
    updateEventmanDetailsStart,
}
