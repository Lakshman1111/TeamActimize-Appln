import * as types from '../actions/actionTypes';

const initialState = {
    login: {
        users: [],
        token: null,
        status: 'logged out',
        loading: false,
           },
};

const loginReducer = (state = initialState.login, action)=>{
    switch (action.type) {
            //Login exixting user 
            
        case types.LOGIN_USER_START:
            
            return {
                ...state,
                loading: true
            };
        case types.LOGIN_USER_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
            case types.LOGIN_USER_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            default:
            return state;
    }

}
export default loginReducer;