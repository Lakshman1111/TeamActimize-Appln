import * as types from './actionTypes';
//loading Dashboard details
export const loadDashboardDetailsStart = () => ({
    type: types.LOAD_DASHBOARD_DETAILS_START,
});
export const loadDashboardDetailsSuccess = (data) => (
    {
        type: types.LOAD_DASHBOARD_DETAILS_SUCCESS,
        payload: data,
    });
export const loadDashboardDetailsError = (error) => ({
    type: types.LOAD_DASHBOARD_DETAILS_ERROR,
    payload: error,
});
