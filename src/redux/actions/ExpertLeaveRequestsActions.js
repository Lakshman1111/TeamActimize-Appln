import * as types from './actionTypes';
//adding Leave Requests details
export const createLeaveRequestsDetailsStart =  (users) =>({
    type:types.CREATE_LEAVEREQUESTS_DETAILS_START,
    payload: users,
});
export const createLeaveRequestsDetailsSuccess =  () =>({
    type:types.CREATE_LEAVEREQUESTS_DETAILS_SUCCESS,
});
export const createLeaveRequestsDetailsError = (error) =>({
    type:types.CREATE_LEAVEREQUESTS_DETAILS_ERROR,
    payload: error,
});
//loading work experience details
export const loadLeaveRequestsDetailsStart = (pageno) =>({
    type:types.LOAD_LEAVEREQUESTS_DETAILS_START,
    payload:{page : pageno },
});
export const loadLeaveRequestsDetailsSuccess = (data) =>(
    {
    type:types.LOAD_LEAVEREQUESTS_DETAILS_SUCCESS,
    payload: data,
});
export const loadLeaveRequestsDetailsError = (error) =>({
    type:types.LOAD_LEAVEREQUESTS_DETAILS_ERROR,
    payload: error,
});
export const updateLeaveRequestsDetailsStart = (id,userInfo) =>{
    return{
        type:types.UPDATE_LEAVEREQUESTS_DETAILS_START,
        payload: [id,userInfo],
    }
};

export const  updateLeaveRequestsDetailsSuccess = () =>({
    type:types.UPDATE_LEAVEREQUESTS_DETAILS_SUCCESS,   
});
export const  updateLeaveRequestsDetailsError = (error) =>({
    type:types.UPDATE_LEAVEREQUESTS_DETAILS_ERROR,
    payload: error,
});
export default {
    createLeaveRequestsDetailsStart,
    loadLeaveRequestsDetailsStart,
    updateLeaveRequestsDetailsStart,
}
