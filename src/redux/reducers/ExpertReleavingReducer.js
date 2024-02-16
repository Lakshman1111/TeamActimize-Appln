import * as types from '../actions/actionTypes';

const initialState = {
    createReleavingDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const ReleavingDetailsReducer = (state = initialState.createReleavingDetails, action)=>{
    switch (action.type) {
            case types.CREATE_RELEAVING_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_RELEAVING_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_RELEAVING_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            case types.LOAD_RELEAVING_DETAILS_START:        
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_RELEAVING_DETAILS_SUCCESS:         
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_RELEAVING_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    }
        case types.UPDATE_RELEAVING_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_RELEAVING_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
        case types.UPDATE_RELEAVING_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };        
            default:
            return state;
    }

}
export default ReleavingDetailsReducer