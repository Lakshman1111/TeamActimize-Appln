import * as types from '../actions/actionTypes';
const initialState = {
    loadAllExpertsDetails: {
        users: [],
        token: null,
        loading: false,
    },
};
const allExpertrsReducer = (state = initialState.loadAllExpertsDetails, action)=>{
    switch (action.type) {
            case types.LOAD_ALL_EXPERTS_START:
                return {
                    ...state,
                    loading: true,
                };
    
            case types.LOAD_ALL_EXPERTS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                };
    
            case types.LOAD_ALL_EXPERTS_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            default:
            return state;
    }
}
export default allExpertrsReducer;