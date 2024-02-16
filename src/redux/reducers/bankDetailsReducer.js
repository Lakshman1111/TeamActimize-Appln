import * as types from '../actions/actionTypes';

const initialState = {
    createBankDetails: {
        users: [],
        token: null,
        loading: false,
    },
};
const bankDetailsReducer = (state = initialState.createBankDetails, action)=>{
    switch (action.type) {
            case types.CREATE_BANK_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_BANK_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_BANK_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            case types.LOAD_BANK_DETAILS_START:       
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_BANK_DETAILS_SUCCESS:   
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_BANK_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
            default:
            return state;
    }
}
export default bankDetailsReducer;