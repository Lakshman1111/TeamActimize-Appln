import * as types from './actionTypes';
export const createHoursEntryDetailsStart = (users) => ({
    type: types.CREATE_HOURSENTRY_DETAILS_START,
    payload: users,
});
export const createHoursEntryDetailsSuccess = () => ({
    type: types.CREATE_HOURSENTRY_DETAILS_SUCCESS,
});
export const createHoursEntryDetailsError = (error) => ({
    type: types.CREATE_HOURSENTRY_DETAILS_ERROR,
    payload: error,
});
export const loadHoursEntryDetailsStart = () => ({
    type: types.LOAD_HOURSENTRY_DETAILS_START,
});
export const loadHoursEntryDetailsSuccess = (data) => {
    return {
    type: types.LOAD_HOURSENTRY_DETAILS_SUCCESS,
    payload: data,
};
}
export const loadHoursEntryDetailsError = (error) => ({
    type: types.LOAD_HOURSENTRY_DETAILS_ERROR,
    payload: error,
});
export const updateHoursEntryDetailsStart = (updatedData) => {
    return {
      type: types.UPDATE_HOURSENTRY_DETAILS_START,
      payload: [updatedData],
    };
  };

export const updateHoursEntryDetailsSuccess = () => ({
    type: types.UPDATE_HOURSENTRY_DETAILS_SUCCESS,
});
export const updateHoursEntryDetailsError= (error) => ({
    type: types.UPDATE_HOURSENTRY_DETAILS_ERROR,
    payload: error,
});
//loading family details
export const loadFamilyDetailsStart = () => ({
    type: types.LOAD_FAMILY_DETAILS_START,
});

export const loadFamilyDetailsSuccess = (data) => (
    {
        type: types.LOAD_FAMILY_DETAILS_SUCCESS,
        payload: data,
    });
export const loadFamilyDetailsError = (error) => ({
    type: types.LOAD_FAMILY_DETAILS_ERROR,
    payload: error,
});
//deleting familydetails
export const deleteFamilyDetailsStart = (userId) => (
    {
        type: types.DELETE_FAMILY_DETAILS_START,
        payload: userId,
    });

export const deleteFamilyDetailsSuccess = (userId) => ({
    type: types.DELETE_FAMILY_DETAILS_SUCCESS,
    payload: userId,
});

export const deleteFamilyDetailsError = (error) => ({
    type: types.DELETE_FAMILY_DETAILS_ERROR,
    payload: error,
});
//updating existing user details
export const updateFamilyDetailsStart = (id, userInfo) => ({
    type: types.UPDATE_FAMILY_DETAILS_START,
    payload: [id, userInfo],
});

export const updateFamilyDetailsSuccess = () => ({
    type: types.UPDATE_FAMILY_DETAILS_SUCCESS,
});
export const updateFamilyDetailsError = (error) => ({
    type: types.UPDATE_FAMILY_DETAILS_ERROR,
    payload: error,
});
export default {
    createHoursEntryDetailsStart,
    // loadFamilyDetailsStart,
    // deleteFamilyDetailsStart,
    // updateFamilyDetailsStart,
}
