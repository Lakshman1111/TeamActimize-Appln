import * as types from './actionTypes';
export const loadUsersListStart = () =>({
    type:types.LOAD_USERS_LIST_START,
});
//loading user details
export const loadUsersListSuccess = (data) =>(
    {
    type:types.LOAD_USERS_LIST_SUCCESS,
    payload: data,
});
export const loadUsersListError = (error) =>({
    type:types.LOAD_USERS_LIST_ERROR,
    payload: error,
});