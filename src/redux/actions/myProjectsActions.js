import * as types from './actionTypes';
//adding my projects details
export const createMyProjectsDetailsStart =  (users) =>({
    type:types.CREATE_MYPROJECTS_DETAILS_START,
    payload: users,
});
export const createMyProjectsDetailsSuccess =  () =>({
    type:types.CREATE_MYPROJECTS_DETAILS_SUCCESS,
    
});
export const createMyProjectsDetailsError = (error) =>({
    type:types.CREATE_MYPROJECTS_DETAILS_ERROR,
    payload: error,
});
//loading my projects details
export const loadMyProjectsDetailsStart = pageno =>({
    type:types.LOAD_MYPROJECTS_DETAILS_START,
    payload:{page : pageno },
});
export const loadMyProjectsDetailsSuccess = (data) =>(
    {
    type:types.LOAD_MYPROJECTS_DETAILS_SUCCESS,
    payload: data,
});
export const loadMyProjectsDetailsError = (error) =>({
    type:types.LOAD_MYPROJECTS_DETAILS_ERROR,
    payload: error,
});
//deleting my projects details
export const deleteMyProjectsDetailsStart = (userId) =>(
    {
    type:types.DELETE_MYPROJECTS_DETAILS_START,
    payload: userId,
});
export const deleteMyProjectsDetailsSuccess = (userId) =>({
    type:types.DELETE_MYPROJECTS_DETAILS_SUCCESS,
    payload: userId,
});
export const deleteMyProjectsDetailsError = (error) =>({
    type:types.DELETE_MYPROJECTS_DETAILS_ERROR,
    payload: error,
});
//updating my projects existing details
export const updateMyProjectsDetailsStart = (id,userInfo) =>(
    {
    type:types.UPDATE_MYPROJECTS_DETAILS_START,
    payload: [id,userInfo],
});
export const updateMyProjectsDetailsSuccess = () =>({
    type:types.UPDATE_MYPROJECTS_DETAILS_SUCCESS,    
});
export const updateMyProjectsDetailsError = (error) =>({
    type:types.UPDATE_MYPROJECTS_DETAILS_ERROR,
    payload: error,
});
export default {
    createMyProjectsDetailsStart,
    loadMyProjectsDetailsStart,
    deleteMyProjectsDetailsStart,
    updateMyProjectsDetailsStart,
}