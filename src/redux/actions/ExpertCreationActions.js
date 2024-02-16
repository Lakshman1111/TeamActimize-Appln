import * as types from './actionTypes';
//adding expeert creation details
export const createExpertCreationStart = (users) => {
    return {
      type: types.CREATE_EXPERT_CREATION_START,
      payload: users,
    };
  };
export const createExpertCreationSuccess =  () =>({
    type:types.CREATE_EXPERT_CREATION_SUCCESS,   
});
export const createExpertCreationError = (error) =>({
    type:types.CREATE_EXPERT_CREATION_ERROR,
    payload: error,
});
//loading bank details
export const loadBankDetailsStart = () =>({
    type:types.LOAD_BANK_DETAILS_START,
});
export const loadBankDetailsSuccess = (data) =>({
    type:types.LOAD_BANK_DETAILS_SUCCESS,
    payload: data, 
});
export const loadBankDetailsError = (error) =>({
    type:types.LOAD_BANK_DETAILS_ERROR,
    payload: error,
});
export default {
    createExpertCreationStart,  
}
