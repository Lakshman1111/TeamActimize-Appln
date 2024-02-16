import * as types from '../actions/actionTypes';
const initialState = {
    createBirthdayDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const expertBirthdayDetailsReducer = (state = initialState.createBirthdayDetails, action)=>{
    switch (action.type) {
            case types.LOAD_BIRTHDAY_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.LOAD_BIRTHDAY_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_BIRTHDAY_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
            default:
            return state;
    }
}
export default expertBirthdayDetailsReducer