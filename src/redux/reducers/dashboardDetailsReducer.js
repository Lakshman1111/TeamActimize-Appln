import * as types from '../actions/actionTypes';
const initialState = {
    users: [],
};
const getDashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        //getting  user 
        case types.LOAD_DASHBOARD_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.LOAD_DASHBOARD_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case types.LOAD_DASHBOARD_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}
export default getDashboardReducer;