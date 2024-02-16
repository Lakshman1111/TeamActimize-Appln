import * as types from '../actions/actionTypes';

const initialState = {
    createFamilyDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const familyDetailsReducer = (state = initialState.createFamilyDetails, action)=>{
    switch (action.type) {
            case types.CREATE_FAMILY_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_FAMILY_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_FAMILY_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            case types.LOAD_FAMILY_DETAILS_START:        
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_FAMILY_DETAILS_SUCCESS:         
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_FAMILY_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
             //deleting family details  details
        case types.DELETE_FAMILY_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.DELETE_FAMILY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
                users: state.users.filter((item)=>item.id !== action.payload),
            };
            case types.DELETE_FAMILY_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            //updating existing user details
        case types.UPDATE_FAMILY_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_FAMILY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
        case types.UPDATE_FAMILY_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };        
    
            default:
            return state;
    }

}
export default familyDetailsReducer;