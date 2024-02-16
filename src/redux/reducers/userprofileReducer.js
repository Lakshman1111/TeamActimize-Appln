import * as types from '../actions/actionTypes';

const initialState = {
    create: {
        users: [],
        token: null,
        loading: false,
           },
};
const createProfileReducer = (state = initialState.create, action)=>{
    switch (action.type) {
            case types.CREATE_PROFILE_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_PROFILE_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_PROFILE_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
                //updating existing user details
            case types.UPDATE_PROFILE_START:
                return {
                    ...state,
                    loading: true
                };
            case types.UPDATE_PROFILE_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.UPDATE_PROFILE_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };    
    
            default:
            return state;
    }

}
export default createProfileReducer;