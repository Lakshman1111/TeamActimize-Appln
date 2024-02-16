import * as types from '../actions/actionTypes';
const initialState = {
    createEmergencyDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const emergencyDetailsReducer = (state = initialState.createEmergencyDetails, action)=>{
    switch (action.type) {
            case types.CREATE_EMERGENCY_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_EMERGENCY_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_EMERGENCY_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            case types.LOAD_EMERGENCY_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_EMERGENCY_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_EMERGENCY_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };

             //deleting emergency details  details
        case types.DELETE_EMERGENCY_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.DELETE_EMERGENCY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
                users: state.users.filter((item)=>item.id !== action.payload),
            };
            case types.DELETE_EMERGENCY_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            //updating existing emergency details
        case types.UPDATE_EMERGENCY_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_EMERGENCY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
        case types.UPDATE_EMERGENCY_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };        
    
            default:
            return state;
    }

}
export default emergencyDetailsReducer;