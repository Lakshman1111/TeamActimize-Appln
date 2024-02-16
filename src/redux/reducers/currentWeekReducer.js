import * as types from '../actions/actionTypes';
const initialState = {
    currentWeek: {
        users: [],
        token: null,
        loading: false,
           },
};
const getCurrentWeekDetails = (state = initialState.currentWeek, action)=>{ 
    switch (action.type) {
        case types.LOAD_CURRENT_WEEK_DETAILS_START:        
        return {
            ...state,
            loading: true
        };
    case types.LOAD_CURRENT_WEEK_DETAILS_SUCCESS:    
        return {
            ...state,
            loading: false ,
            data:action.payload
        };
        case types.LOAD_CURRENT_WEEK_DETAILS_ERROR:
        return {
            ...state,
            loading: false ,
            error:action.payload
        };
        default: return state;
}}
export default getCurrentWeekDetails;