import * as types from '../actions/actionTypes';
const initialState = {
    users: [],
};

const getUserReducer = (state = initialState, action)=>{
    switch (action.type) {
            case types.LOAD_USERS_START:
            return {
                ...state,
                loading: true
            };
        
        case types.LOAD_USERS_SUCCESS:
            return {
                ...state,
                loading: false ,
                data:action.payload
            };
            case types.LOAD_USERS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            default:
            return state;
    }

}
export default getUserReducer;