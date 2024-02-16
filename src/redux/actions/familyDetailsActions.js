import * as types from './actionTypes';
//adding family details
export const createFamilyDetailsStart =  (users) =>({
    type:types.CREATE_FAMILY_DETAILS_START,
    payload: users,
});
export const createFamilyDetailsSuccess =  () =>({
    type:types.CREATE_FAMILY_DETAILS_SUCCESS,
 });
export const createFamilyDetailsError = (error) =>({
    type:types.CREATE_FAMILY_DETAILS_ERROR,
    payload: error,
});
   //loading family details
export const loadFamilyDetailsStart = () =>({
    type:types.LOAD_FAMILY_DETAILS_START,
});
export const loadFamilyDetailsSuccess = (data) =>(
    {
    type:types.LOAD_FAMILY_DETAILS_SUCCESS,
    payload: data,
});
export const loadFamilyDetailsError = (error) =>({
    type:types.LOAD_FAMILY_DETAILS_ERROR,
    payload: error,
});
//deleting familydetails
export const deleteFamilyDetailsStart = (userId) =>(
    {
    type:types.DELETE_FAMILY_DETAILS_START,
    payload: userId,
});
export const deleteFamilyDetailsSuccess = (userId) =>({
    type:types.DELETE_FAMILY_DETAILS_SUCCESS,
    payload: userId,
});       
export const deleteFamilyDetailsError = (error) =>({
    type:types.DELETE_FAMILY_DETAILS_ERROR,
    payload: error,
});
//updating existing user details
export const updateFamilyDetailsStart = (id,userInfo) =>({
    type:types.UPDATE_FAMILY_DETAILS_START,
    payload: [id,userInfo],
});
export const updateFamilyDetailsSuccess = () =>({
    type:types.UPDATE_FAMILY_DETAILS_SUCCESS,
});
export const updateFamilyDetailsError = (error) =>({
    type:types.UPDATE_FAMILY_DETAILS_ERROR,
    payload: error,
});
export default {
    createFamilyDetailsStart,
    loadFamilyDetailsStart,
    deleteFamilyDetailsStart,
    updateFamilyDetailsStart,
}
