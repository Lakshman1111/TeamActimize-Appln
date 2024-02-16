import * as types from './actionTypes';
export const createReleavingDetailsStart =  (users) =>({
    type:types.CREATE_RELEAVING_DETAILS_START,
    payload: users,
});
export const createReleavingDetailsSuccess =  () =>({
    type:types.CREATE_RELEAVING_DETAILS_SUCCESS,
});
export const createReleavingDetailsError = (error) =>({
    type:types.CREATE_RELEAVING_DETAILS_ERROR,
    payload: error,
});
export const loadReleavingDetailsStart = (pageno) =>({
    type:types.LOAD_RELEAVING_DETAILS_START,
    payload:{page : pageno },
});
export const loadReleavingDetailsSuccess = (data) =>(
    {
    type:types.LOAD_RELEAVING_DETAILS_SUCCESS,
    payload: data,
});

export const loadReleavingDetailsError = (error) =>({
    type:types.LOAD_RELEAVING_DETAILS_ERROR,
    payload: error,
});
// //updating existing user details
export const updateReleavingDetailsStart = (id,userInfo) =>{{
 return{
    type:types.UPDATE_RELEAVING_DETAILS_START,
    payload: [id,userInfo],
 }
}};
export const  updateReleavingDetailsSuccess = () =>({
    type:types.UPDATE_RELEAVING_DETAILS_SUCCESS,
});
export const  updateReleavingDetailsError = (error) =>({
    type:types.UPDATE_RELEAVING_DETAILS_ERROR,
    payload: error,
});
export default {
    createReleavingDetailsStart,
    loadReleavingDetailsStart,
    updateReleavingDetailsStart,
}
