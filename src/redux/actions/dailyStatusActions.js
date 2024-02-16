import * as types from './actionTypes';
//adding status details
export const createStatusDetailsStart =  (users) =>({
    type:types.CREATE_DAILYSTATUS_DETAILS_START,
    payload: users,
});
export const createStatusDetailsSuccess =  () =>({
    type:types.CREATE_DAILYSTATUS_DETAILS_SUCCESS, 
});
export const createStatusDetailsError = (error) =>({
    type:types.CREATE_DAILYSTATUS_DETAILS_ERROR,
    payload: error,
});
//loading status details
export const loadStatusDetailsStart = (pageno) =>({
    type:types.LOAD_DAILYSTATUS_DETAILS_START,
    payload:{page : pageno },
});
export const loadStatusDetailsSuccess = (data) =>( 
    {
    type:types.LOAD_DAILYSTATUS_DETAILS_SUCCESS,
    payload: data,
});
export const loadStatusDetailsError = (error) =>({
    type:types.LOAD_DAILYSTATUS_DETAILS_ERROR,
    payload: error,
});
//deleting status details
export const deleteStatusDetailsStart = (userId) =>(
    console.log('delete Status',userId),
    {
    type:types.DELETE_DAILYSTATUS_DETAILS_START,
    payload: userId,
});

export const deleteStatusDetailsSuccess = (userId) =>({
    type:types.DELETE_DAILYSTATUS_DETAILS_SUCCESS,
    payload: userId,
});

export const deleteStatusDetailsError = (error) =>({
    type:types.DELETE_DAILYSTATUS_DETAILS_ERROR,
    payload: error,
});
//updating status existing user details
export const updateStatusDetailsStart = (id,userInfo) =>(    
    {
    type:types.UPDATE_DAILYSTATUS_DETAILS_START,
    payload: [id,userInfo],
});

export const updateStatusDetailsSuccess = () =>({
    type:types.UPDATE_DAILYSTATUS_DETAILS_SUCCESS,
});

export const updateStatusDetailsError = (error) =>({
    type:types.UPDATE_DAILYSTATUS_DETAILS_ERROR,
    payload: error,
});
export default {
    createStatusDetailsStart,
    loadStatusDetailsStart,
    deleteStatusDetailsStart,
    updateStatusDetailsStart,
}