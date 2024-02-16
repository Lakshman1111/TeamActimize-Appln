import * as types from '../actions/actionTypes';

const initialState = {
    createbankWiseDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const bankWiseDetailsReducer = (state = initialState.createbankWiseDetails, action)=>{
    switch (action.type) {
            case types.LOAD_BANKWISE_DETAILS_START:         
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_BANKWISE_DETAILS_SUCCESS:        
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_BANKWISE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
    
            default:
            return state;
    }
}
export default bankWiseDetailsReducer