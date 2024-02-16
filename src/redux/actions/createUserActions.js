import * as types from './actionTypes';
export const createUserStart = (users) => {
    return {
        type: types.CREATE_USER_START,
        payload: users,
    };
};
export const createUserSuccess =  () =>({
    type:types.CREATE_USER_SUCCESS,
});
export const createUserError = (error) =>({
    type:types.CREATE_USER_ERROR,
    payload: error,
});
//updating personal detaila details
export const updateUserStart = (userInfo) =>({
    type:types.UPDATE_USER_START,
    payload: userInfo,
});
export const updateUserSuccess = () =>({
    type:types.UPDATE_USER_SUCCESS,
});
export const updateUserError = (error) =>({
    type:types.UPDATE_USER_ERROR,
    payload: error,
});
export const createProfileStart = (users) => {
    console.log('Payload for createUserStart:', users);
    return {
        type: types.CREATE_PROFILE_START,
        payload: users,
    };
};
export const createProfileSuccess =  () =>({
    type:types.CREATE_PROFILE_SUCCESS, 
});
export const createProfileError = (error) =>({
    type:types.CREATE_PROFILE_ERROR,
    payload: error,
});
export default {
    createUserStart,
    createProfileStart,
}
