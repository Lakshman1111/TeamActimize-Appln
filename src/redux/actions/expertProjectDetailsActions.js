import * as types from './actionTypes';
//adding work experience details
export const createProjectDetailsStart =  (users) =>({
    type:types.CREATE_PROJECT_DETAILS_START,
    payload: users,
});
export const createProjectDetailsSuccess =  () =>({
    type:types.CREATE_PROJECT_DETAILS_SUCCESS,
});
export const createProjectDetailsError = (error) =>({
    type:types.CREATE_PROJECT_DETAILS_ERROR,
    payload: error,
});

//loading work experience details
export const loadProjectDetailsStart = (pageno) =>({
    type:types.LOAD_PROJECT_DETAILS_START,
    payload:{page : pageno },
});
export const loadProjectDetailsSuccess = (data) =>(
    {
    type:types.LOAD_PROJECT_DETAILS_SUCCESS,
    payload: data,
});
export const loadProjectDetailsError = (error) =>({
    type:types.LOAD_PROJECT_DETAILS_ERROR,
    payload: error,
});
// deleting work experiencedetails
export const deleteProjectDetailsStart = (userId) =>(
    {
    type:types.DELETE_PROJECT_DETAILS_START,
    payload: userId,
});

export const deleteProjectDetailsSuccess = (userId) =>({
    type:types.DELETE_PROJECT_DETAILS_SUCCESS,
    payload: userId,
});

export const deleteProjectDetailsError = (error) =>({
    type:types.DELETE_PROJECT_DETAILS_ERROR,
    payload: error,
});
export const updateProjectDetailsStart = (id,userInfo) =>({
    type:types.UPDATE_PROJECT_DETAILS_START,
    payload: [id,userInfo],
});
export const  updateProjectDetailsSuccess = () =>({
    type:types.UPDATE_PROJECT_DETAILS_SUCCESS,
});
export const  updateProjectDetailsError = (error) =>({
    type:types.UPDATE_PROJECT_DETAILS_ERROR,
    payload: error,
});
export default {
    createProjectDetailsStart,
    loadProjectDetailsStart,
    deleteProjectDetailsStart,
    updateProjectDetailsStart,
}
