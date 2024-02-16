import * as types from '../actions/actionTypes';
const initialState = {
    createProjectDetails: {
        users: {},
        token: null,
        loading: false,
           },
};
const myProjectsReducer = (state = initialState.createProjectDetails, action)=>{
    switch (action.type) {
        case types.CREATE_MYPROJECTS_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_MYPROJECTS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_MYPROJECTS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            // loading status details
                case types.LOAD_MYPROJECTS_DETAILS_START:
                         
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_MYPROJECTS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_MYPROJECTS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };

                //deleting family details  details
            case types.DELETE_MYPROJECTS_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.DELETE_MYPROJECTS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    users: state.users.filter((item)=>item.id !== action.payload),
                };
                case types.DELETE_MYPROJECTS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
                //updating existing status details
            case types.UPDATE_MYPROJECTS_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.UPDATE_MYPROJECTS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.UPDATE_MYPROJECTS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };                
                
                default:
                return state;
        }       

}    
export default myProjectsReducer;            