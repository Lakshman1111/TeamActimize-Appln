import * as types from './actionTypes';
export const loadUsersStart = () =>({
    type:types.LOAD_USERS_START,
});
//loading user details
export const loadUsersSuccess = (data) =>(
    {
    type:types.LOAD_USERS_SUCCESS,
    payload: data,
    });

export const loadUsersError = (error) =>({
    type:types.LOAD_USERS_ERROR,
    payload: error,
});
