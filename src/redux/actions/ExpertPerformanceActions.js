import * as types from './actionTypes';
//adding expeert creation details
export const createPerformanceDetailsStart = (users) => {
    return {
      type: types.CREATE_PERFORMANCE_DETAILS_START,
      payload: users,
    };
  };
export const createPerformanceDetailsSuccess =  () =>({
    type:types.CREATE_DMERITS_DETAILS_SUCCESS,
    
});
export const createPerformanceDetailsError = (error) =>({
    type:types.CREATE_PERFORMANCE_DETAILS_ERROR,
    payload: error,
});
export const loadPerformanceDetailsStart= (pageno) =>({
    type:types.LOAD_PERFORMANCE_DETAILS_START,
    payload:{page : pageno },
});
export const loadPerformanceDetailsSuccess = (data) => {
    return {
        type: types.LOAD_PERFORMANCE_DETAILS_SUCCESS,
        payload: data,
    };
};
export const loadPerformanceDetailsError = (error) =>({
    type:types.LOAD_PERFORMANCE_DETAILS_ERROR,
    payload: error,
});
export const updatePerformanceDetailsStart = (id,userInfo) => {
    return {
        type:types.UPDATE_PERFORMANCE_DETAILS_START,
        payload: [id,userInfo],
    };
  };
export const updatePerformanceDetailsSuccess = () =>({
    type:types.UPDATE_PERFORMANCE_DETAILS_SUCCESS, 
});
export const updatePerformanceDetailsError = (error) =>({
    type:types.UPDATE_PERFORMANCE_DETAILS_ERROR,
    payload: error,
});
export default {
    createPerformanceDetailsStart,
}
