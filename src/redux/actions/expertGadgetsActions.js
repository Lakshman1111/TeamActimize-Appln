import * as types from './actionTypes';
//adding work experience details
export const createGadgetDetailsStart =  (users) =>({
    type:types.CREATE_GADGETS_DETAILS_START,
    payload: users,
});
export const createGadgetDetailsSuccess =  () =>({
    type:types.CREATE_GADGETS_DETAILS_SUCCESS,
});
export const createGadgetDetailsError = (error) =>({
    type:types.CREATE_GADGETS_DETAILS_ERROR,
    payload: error,
});
//loading work experience details
export const loadGadgetDetailsStart = (pageno) =>({
    type:types.LOAD_GADGETS_DETAILS_START,
    payload:{page : pageno },
});

export const loadGadgetDetailsSuccess = (data) =>(
    {
    type:types.LOAD_GADGETS_DETAILS_SUCCESS,
    payload: data,
});

export const loadGadgetDetailsError = (error) =>({
    type:types.LOAD_GADGETS_DETAILS_ERROR,
    payload: error,
});
//deleting work experiencedetails
export const deleteGadgetDetailsStart = (userId) =>(
    console.log('deleteWorkExperience',userId),
    {
    type:types.DELETE_GADGETS_DETAILS_START,
    payload: userId,
});

export const deleteGadgetDetailsSuccess = (userId) =>({
    type:types.DELETE_GADGETS_DETAILS_SUCCESS,
    payload: userId,
});

export const deleteGadgetDetailsError = (error) =>({
    type:types.DELETE_GADGETS_DETAILS_ERROR,
    payload: error,
});
// //updating existing user details
export const updateGadgetDetailsStart = (id,userInfo) =>({
    type:types.UPDATE_GADGETS_DETAILS_START,
    payload: [id,userInfo],
});

export const  updateGadgetDetailsSuccess = () =>({
    type:types.UPDATE_GADGETS_DETAILS_SUCCESS,
});
export const  updateGadgetDetailsError = (error) =>({
    type:types.UPDATE_GADGETS_DETAILS_ERROR,
    payload: error,
});
export default {
    createGadgetDetailsStart,
    loadGadgetDetailsStart,
    deleteGadgetDetailsStart,
    updateGadgetDetailsStart,
}
