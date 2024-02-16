import * as types from '../actions/actionTypes';

const initialState = {
    create: {
        users: [],
        token: null,
        loading: false,
           },
};
const createUserReducer = (state = initialState.create, action)=>{
    switch (action.type) {
            case types.CREATE_USER_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_USER_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_USER_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
                //updating existing user details
            case types.UPDATE_USER_START:
                return {
                    ...state,
                    loading: true
                };
            case types.UPDATE_USER_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.UPDATE_USER_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };    
    
            default:
            return state;
    }

}
export default createUserReducer;