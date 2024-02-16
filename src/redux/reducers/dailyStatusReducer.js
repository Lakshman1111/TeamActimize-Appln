import * as types from '../actions/actionTypes';

const initialState = {
    createStatusDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const statusDetailsReducer = (state = initialState.createStatusDetails, action)=>{
    switch (action.type) {
            case types.CREATE_DAILYSTATUS_DETAILS_START:
               
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_DAILYSTATUS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_DAILYSTATUS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            // loading status details
                case types.LOAD_DAILYSTATUS_DETAILS_START:
                         
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_DAILYSTATUS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_DAILYSTATUS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };

                //deleting family details  details
            case types.DELETE_DAILYSTATUS_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.DELETE_DAILYSTATUS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    users: state.users.filter((item)=>item.id !== action.payload),
                };
                case types.DELETE_DAILYSTATUS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
                //updating existing status details
            case types.UPDATE_DAILYSTATUS_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.UPDATE_DAILYSTATUS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.UPDATE_DAILYSTATUS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };                
                
                default:
                return state;
        }       

}    
export default statusDetailsReducer;            