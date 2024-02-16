import * as types from './actionTypes';
//adding leave details
export const createLeaveDetailsStart =  (users) =>(
    {
    type:types.CREATE_LEAVES_DETAILS_START,
    payload: users,
});
export const createLeaveDetailsSuccess =  () =>({
    type:types.CREATE_LEAVES_DETAILS_SUCCESS,
});
export const createLeaveDetailsError = (error) =>({
    type:types.CREATE_LEAVES_DETAILS_ERROR,
    payload: error,
});

//loading leave details
export const loadLeaveDetailsStart = (pageno) =>{
    return{
        type:types.LOAD_LEAVES_DETAILS_START,
        payload:{page : pageno },
    }
};
export const loadLeaveDetailsSuccess = (data) => {
    return {
        type: types.LOAD_LEAVES_DETAILS_SUCCESS,
        payload: data
    };
};
export const loadLeaveDetailsError = (error) =>({
    type:types.LOAD_LEAVES_DETAILS_ERROR,
    payload: error,
});
//deleting leave details
export const deleteLeaveDetailsStart = (userId) =>(
    console.log('deleteLeave',userId),
    {
    type:types.DELETE_LEAVES_DETAILS_START,
    payload: userId,
});

export const deleteLeaveDetailsSuccess = (userId) =>({
    type:types.DELETE_LEAVES_DETAILS_SUCCESS,
    payload: userId,
});

export const deleteLeaveDetailsError = (error) =>({
    type:types.DELETE_LEAVES_DETAILS_ERROR,
    payload: error,
});
//updating leave details
export const updateLeaveDetailsStart = (id,userInfo) =>({
    
    //   console.log("actionData",id,userInfo)
    type:types.UPDATE_LEAVES_DETAILS_START,
    payload: [id,userInfo],
});
export const updateLeaveDetailsSuccess = () =>({
    type:types.UPDATE_LEAVES_DETAILS_SUCCESS,
});
export const updateLeaveDetailsError = (error) =>({
    type:types.UPDATE_LEAVES_DETAILS_ERROR,
    payload: error,
});
export default {
    createLeaveDetailsStart,
    loadLeaveDetailsStart,
    deleteLeaveDetailsStart,
    updateLeaveDetailsStart,
}
