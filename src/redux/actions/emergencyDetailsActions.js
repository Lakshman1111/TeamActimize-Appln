import * as types from './actionTypes';
//adding emergency details
export const createEmergencyDetailsStart =  (users) =>({
    type:types.CREATE_EMERGENCY_DETAILS_START,
    payload: users,
});
export const createEmergencyDetailsSuccess =  () =>({
    type:types.CREATE_EMERGENCY_DETAILS_SUCCESS,
});
export const createEmergencyDetailsError = (error) =>({
    type:types.CREATE_EMERGENCY_DETAILS_ERROR,
    payload: error,
});
//loading emergency details
export const loadEmergencyDetailsStart = () =>({
    type:types.LOAD_EMERGENCY_DETAILS_START,
});
export const loadEmergencyDetailsSuccess = (data) =>(
    {
    type:types.LOAD_EMERGENCY_DETAILS_SUCCESS,
    payload: data,
});

export const loadEmergencyDetailsError = (error) =>({
    type:types.LOAD_EMERGENCY_DETAILS_ERROR,
    payload: error,
});
//deleting emergency details
export const deleteEmergencyDetailsStart = (userId) =>(
    {
    type:types.DELETE_EMERGENCY_DETAILS_START,
    payload: userId,
});

export const deleteEmergencyDetailsSuccess = (userId) =>({
    type:types.DELETE_EMERGENCY_DETAILS_SUCCESS,
    payload: userId,
});

export const deleteEmergencyDetailsError = (error) =>({
    type:types.DELETE_EMERGENCY_DETAILS_ERROR,
    payload: error,
});
//updating existing user details
export const updateEmergencyDetailsStart = (id,userInfo) =>({
    type:types.UPDATE_EMERGENCY_DETAILS_START,
    payload: [id,userInfo],
});

export const updateEmergencyDetailsSuccess = () =>({
    type:types.UPDATE_EMERGENCY_DETAILS_SUCCESS,
});

export const updateEmergencyDetailsError = (error) =>({
    type:types.UPDATE_EMERGENCY_DETAILS_ERROR,
    payload: error,
});
export default {
    createEmergencyDetailsStart,
    loadEmergencyDetailsStart,
    deleteEmergencyDetailsStart,
    updateEmergencyDetailsStart,
}
