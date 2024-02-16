import * as types from './actionTypes';
//adding work experience details
export const createWorkExperienceDetailsStart =  (users) =>({
    type:types.CREATE_WORKEXP_DETAILS_START,
    payload: users,
});
export const createWorkExperienceDetailsSuccess =  () =>({
    type:types.CREATE_WORKEXP_DETAILS_SUCCESS,
    
});
export const createWorkExperienceDetailsError = (error) =>({
    type:types.CREATE_WORKEXP_DETAILS_ERROR,
    payload: error,
});

//loading work experience details
export const loadWorkExperienceDetailsStart = () =>({
    type:types.LOAD_WORKEXP_DETAILS_START,
});

export const loadWorkExperienceDetailsSuccess = (data) =>(
    {
    type:types.LOAD_WORKEXP_DETAILS_SUCCESS,
    payload: data,
});

export const loadWorkExperienceDetailsError = (error) =>({
    type:types.LOAD_WORKEXP_DETAILS_ERROR,
    payload: error,
});
//deleting work experiencedetails
export const deleteWorkExperienceDetailsStart = (userId) =>(
    console.log('deleteWorkExperience',userId),
    {
    type:types.DELETE_WORKEXP_DETAILS_START,
    payload: userId,
});

export const deleteWorkExperienceDetailsSuccess = (userId) =>({
    type:types.DELETE_WORKEXP_DETAILS_SUCCESS,
    payload: userId,
});

export const deleteWorkExperienceDetailsError = (error) =>({
    type:types.DELETE_WORKEXP_DETAILS_ERROR,
    payload: error,
});
//updating existing user details
export const updateWorkExperienceDetailsStart = (id,userInfo) =>({
    //   console.log("actionData",id,userInfo)
    type:types.UPDATE_WORKEXP_DETAILS_START,
    payload: [id,userInfo],
});

export const updateWorkExperienceDetailsSuccess = () =>({
    type:types.UPDATE_WORKEXP_DETAILS_SUCCESS,
    
});

export const updateWorkExperienceDetailsError = (error) =>({
    type:types.UPDATE_WORKEXP_DETAILS_ERROR,
    payload: error,
});
export default {
    createWorkExperienceDetailsStart,
    loadWorkExperienceDetailsStart,
    deleteWorkExperienceDetailsStart,
    updateWorkExperienceDetailsStart,
}
