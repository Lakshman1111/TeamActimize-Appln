import * as types from '../actions/actionTypes';

const initialState = {
    createWeeklyDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const weeklyExpertDetailsReducer = (state = initialState.createWeeklyDetails, action)=>{
    switch (action.type) {
            case types.LOAD_WEEKLY_DETAILS_START:       
                return {
                    ...state,
                    loading: true
                };
            case types.LOAD_WEEKLY_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_WEEKLY_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };   
            default:
            return state;
    }

}
export default weeklyExpertDetailsReducer