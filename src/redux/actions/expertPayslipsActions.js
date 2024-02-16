import * as types from './actionTypes';
//adding work experience details
export const createPayslipDetailsStart =  (users) =>{
    return {
    type:types.CREATE_PAYSLIP_DETAILS_START,
    payload: users,
}};
export const createPayslipDetailsSuccess =  () =>({
    type:types.CREATE_PAYSLIP_DETAILS_SUCCESS,
});
export const createPayslipDetailsError = (error) =>({
    type:types.CREATE_PAYSLIP_DETAILS_ERROR,
    payload: error,
});
export const storeApiResult = (data) => {
    return {
        type:types. STORE_API_RESULT,
      payload: data,
    };
  };
export default {
    createPayslipDetailsStart,
    storeApiResult
}
