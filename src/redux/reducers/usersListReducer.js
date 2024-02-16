import * as types from '../actions/actionTypes';
const initialState = {
    createUsersList: {
        users: [],
        token: null,
        loading: false,
           },
};
const userListReducer = (state = initialState.createUsersList, action)=>{
    switch (action.type) {
            case types.LOAD_USERS_LIST_START:
            return {
                ...state,
                loading: true
            };
        case types.LOAD_USERS_LIST_SUCCESS:
            return {
                ...state,
                loading: false ,
                data:action.payload
            };
            case types.LOAD_USERS_LIST_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            default:
            return state;
    }

}
export default userListReducer;