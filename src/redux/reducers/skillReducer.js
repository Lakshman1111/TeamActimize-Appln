import * as types from '../actions/actionTypes';

const initialState = {
    createSkillDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const skillDetailsReducer = (state = initialState.createSkillDetails, action)=>{
    switch (action.type) {
            case types.CREATE_SKILLS_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_SKILLS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_SKILLS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            case types.LOAD_SKILLS_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_SKILLS_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_SKILLS_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };

             //deleting family details  details
        case types.DELETE_SKILLS_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.DELETE_SKILLS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
                users: state.users.filter((item)=>item.id !== action.payload),
            };
            case types.DELETE_SKILLS_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };
            //updating existing user details
        case types.UPDATE_SKILLS_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_SKILLS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
        case types.UPDATE_SKILLS_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };        
    
            default:
            return state;
    }

}
export default skillDetailsReducer;