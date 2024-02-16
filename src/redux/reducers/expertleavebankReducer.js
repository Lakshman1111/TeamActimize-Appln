import * as types from '../actions/actionTypes';

const initialState = {
    createleavebankWiseDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const leavebankWiseDetailsReducer = (state = initialState.createleavebankWiseDetails, action)=>{
    switch (action.type) {
            case types.LOAD_LEAVEBANKWISE_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_LEAVEBANKWISE_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_LEAVEBANKWISE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
            default:
            return state;
    }
}
export default leavebankWiseDetailsReducer