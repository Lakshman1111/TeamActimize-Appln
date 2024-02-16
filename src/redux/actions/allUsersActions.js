import * as types from './actionTypes';
export const loadAllUsersStart = (pageno) =>({
    type:types.LOAD_AllUSERS_DETAILS_START,
    payload:{page : pageno },
});
export const loadAllUsersSuccess = (data) => {
    const action = {
      type: types.LOAD_AllUSERS_DETAILS_SUCCESS,
      payload: data,
    };
    return action;
  };
export const loadAllUsersError = (error) =>({
    type:types.LOAD_AllUSERS_DETAILS_ERROR,
    payload: error,
});
export default {   
    loadAllUsersStart,
}
