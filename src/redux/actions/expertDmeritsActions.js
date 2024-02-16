import * as types from './actionTypes';
export const createDmeritsDetailsStart = (users) => {
    return {
      type: types.CREATE_DMERITS_DETAILS_START,
      payload: users,
    };
  };
export const createDmeritsDetailsSuccess =  () =>({
    type:types.CREATE_DMERITS_DETAILS_SUCCESS,
});
export const createDmeritsDetailsError = (error) =>({
    type:types.CREATE_DMERITS_DETAILS_ERROR,
    payload: error,
});
//loading bank details
export const loadDmeritsDetailsStart= (pageno) =>({

    type:types.LOAD_DMERITS_DETAILS_START,
    payload:{page : pageno },
});

export const loadDmeritsDetailsSuccess = (data) => {
    return {
        type: types.LOAD_DMERITS_DETAILS_SUCCESS,
        payload: data,
    };
};
export const loadDmeritsDetailsError = (error) =>({
    type:types.LOAD_DMERITS_DETAILS_ERROR,
    payload: error,
});
export const updateDmeritsDetailsStart = (id,userInfo) =>{{
    return{
        type:types.UPDATE_DMERITS_DETAILS_START,
        payload: [id,userInfo],
    }   
}};
export const updateDmeritsDetailsSuccess = () =>({
    type:types.UPDATE_DMERITS_DETAILS_SUCCESS,   
});
export const updateDmeritsDetailsError = (error) =>({
    type:types.UPDATE_DMERITS_DETAILS_ERROR,
    payload: error,
});
export default {
    createDmeritsDetailsStart,
    loadDmeritsDetailsStart,
    updateDmeritsDetailsStart,
}
