import * as types from '../actions/actionTypes';
const initialState = {
    loadAllUsersDetails: {
        users: [],
        token: null,
        loading: false,
    },
};
const allUsersReducer = (state = initialState.loadAllUsersDetails, action)=>{
    switch (action.type) {
            case types.LOAD_AllUSERS_DETAILS_START:
                return {
                    ...state,
                    loading: true,
                };
    
            case types.LOAD_AllUSERS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    data: action.payload,
                };
    
            case types.LOAD_AllUSERS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
                default:
            return state;
    }
}
export default allUsersReducer;