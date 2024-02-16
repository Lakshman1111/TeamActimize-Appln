import * as types from './actionTypes';
export const loadBirthdayDetailsStart = (pageno) =>({
    type:types.LOAD_BIRTHDAY_DETAILS_START,
    payload:{page : pageno },
});
export const loadBirthdayDetailsSuccess = (data) =>(
    {
    type:types.LOAD_BIRTHDAY_DETAILS_SUCCESS,
    payload: data,
});
export const loadBirthdayDetailsError = (error) =>({
    type:types.LOAD_BIRTHDAY_DETAILS_ERROR,
    payload: error,
});
export default {
    loadBirthdayDetailsStart,
}
