import * as types from './actionTypes';
export const loadAllExpertsStart = (pageno) =>({

    type:types.LOAD_ALL_EXPERTS_START,
    payload:{page : pageno },
});
export const loadAllExpertsSuccess = (data) => {
    const action = {
      type: types.LOAD_ALL_EXPERTS_SUCCESS,
      payload: data,
    };
    return action;
  };
export const loadAllExpertsError = (error) =>({
    type:types.LOAD_ALL_EXPERTS_ERROR,
    payload: error,
});
export default {
    
    loadAllExpertsStart,
}
