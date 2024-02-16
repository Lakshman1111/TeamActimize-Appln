import * as types from '../actions/actionTypes';

const initialState = {
    createLeaveRequestDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const LeaveRequestDetailsReducer = (state = initialState.createLeaveRequestDetails, action)=>{
    switch (action.type) {
            case types.CREATE_LEAVEREQUESTS_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_LEAVEREQUESTS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_LEAVEREQUESTS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            case types.LOAD_LEAVEREQUESTS_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_LEAVEREQUESTS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_LEAVEREQUESTS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
        case types.UPDATE_LEAVEREQUESTS_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_LEAVEREQUESTS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
        case types.UPDATE_LEAVEREQUESTS_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };        
            default:
            return state;
    }

}
export default LeaveRequestDetailsReducer