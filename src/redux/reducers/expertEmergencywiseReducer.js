import * as types from '../actions/actionTypes';
const initialState = {
    createEmergencyWiseDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const emergencyWiseDetailsReducer = (state = initialState.createEmergencyWiseDetails, action)=>{
    switch (action.type) {
            case types.LOAD_EMERGENCYWISE_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.LOAD_EMERGENCYWISE_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_EMERGENCYWISE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
    
            default:
            return state;
    }

}
export default emergencyWiseDetailsReducer