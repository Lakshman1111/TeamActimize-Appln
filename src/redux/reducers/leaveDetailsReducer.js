import * as types from '../actions/actionTypes';

const initialState = {
    createLeaveDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const leaveDetailsReducer = (state = initialState.createLeaveDetails, action)=>{
    switch (action.type) {
            case types.CREATE_LEAVES_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_LEAVES_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_LEAVES_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            case types.LOAD_LEAVES_DETAILS_START:         
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_LEAVES_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_LEAVES_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
        case types.DELETE_LEAVES_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.DELETE_LEAVES_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
                users: state.users.filter((item)=>item.id !== action.payload),
            };
            case types.DELETE_LEAVES_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            //updating existing user details
        case types.UPDATE_LEAVES_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_LEAVES_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
        case types.UPDATE_LEAVES_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };        
    
            default:
            return state;
    }

}
export default leaveDetailsReducer;