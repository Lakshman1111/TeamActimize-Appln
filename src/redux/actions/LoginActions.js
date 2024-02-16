import * as types from './actionTypes';
export const loginUserStart =  (users) =>(
    console.log("usersAction",users),
    {
    type:types.LOGIN_USER_START,
    payload: users,
});
export const loginUserSuccess =  () =>({
    type:types.LOGIN_USER_SUCCESS,
    
});
export const loginUserError = (error) =>({
    type:types.LOGIN_USER_ERROR,
    payload: error,
});

export default {
    loginUserStart
}
