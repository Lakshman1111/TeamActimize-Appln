import * as types from './actionTypes';
//adding expeert creation details
export const createLeaveBankStart = (users) => {
    return {
      type: types.CREATE_LEAVE_BANK_START,
      payload: users,
    };
  };
export const createLeaveBankSuccess =  () =>({
    type:types.CREATE_LEAVE_BANK_SUCCESS,
    
});
export const createLeaveBankError = (error) =>({
    type:types.CREATE_LEAVE_BANK_ERROR,
    payload: error,
});
//loading bank details
export const loadLeaveBankStart= (pageno) =>({
    type:types.LOAD_LEAVE_BANK_START,
    payload:{page : pageno },
});
export const loadLeaveBankSuccess = (data) => {
    return {
        type: types.LOAD_LEAVE_BANK_SUCCESS,
        payload: data,
    };
};
export const loadLeaveBankError = (error) =>({
    type:types.LOAD_LEAVE_BANK_ERROR,
    payload: error,
});
export const updateLeaveBankStart = (id,userInfo) =>({
    type:types.UPDATE_LEAVE_BANK_START,
    payload: [id,userInfo],
});
export const updateLeaveBankSuccess = () =>({
    type:types.UPDATE_LEAVE_BANK_SUCCESS,  
});
export const updateLeaveBankError = (error) =>({
    type:types.UPDATE_LEAVE_BANK_ERROR,
    payload: error,
});
export const deleteLeaveBankStart = (userId) =>{
    return   {
    type:types.DELETE_LEAVE_BANK_START,
    payload: userId,
}};

export const deleteLeaveBankSuccess = (userId) =>({
    type:types.DELETE_LEAVE_BANK_SUCCESS,
    payload: userId,
});

export const deleteLeaveBankError = (error) =>({
    type:types.DELETE_LEAVE_BANK_ERROR,
    payload: error,
});

export default {
    createLeaveBankStart,
    loadLeaveBankStart,
    updateLeaveBankStart,
}
