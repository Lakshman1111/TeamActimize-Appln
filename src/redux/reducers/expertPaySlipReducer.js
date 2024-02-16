import * as types from '../actions/actionTypes';

const initialState = {
    createpayslipDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const expertPaySlipDetailsReducer = (state = initialState.createpayslipDetails, action)=>{
    switch (action.type) {
            case types.CREATE_PAYSLIP_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_PAYSLIP_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_PAYSLIP_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };      
            default:
            return state;
    }
}
export default expertPaySlipDetailsReducer