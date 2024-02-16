import * as types from './actionTypes';
//loading Dashboard details
export const loadDashboardMangementDetailsStart = () => ({
    type: types.LOAD_DASHBOARDMANGEMENT_DETAILS_START,
});
export const loadDashboardMangementDetailsSuccess = (data) => (
    {
        type: types.LOAD_DASHBOARDMANGEMENT_DETAILS_SUCCESS,
        payload: data,
    });
export const loadDashboardMangementDetailsError = (error) => ({
    type: types.LOAD_DASHBOARDMANGEMENT_DETAILS_ERROR,
    payload: error,
});