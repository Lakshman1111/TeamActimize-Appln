import * as types from '../actions/actionTypes';
const initialState = {
    createMonthlyDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const monthlyExpertDetailsReducer = (state = initialState.createMonthlyDetails, action)=>{
    switch (action.type) {
            case types.LOAD_MONTHLY_DETAILS_START:         
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_MONTHLY_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_MONTHLY_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };  
            default:
            return state;
    }
}
export default monthlyExpertDetailsReducer