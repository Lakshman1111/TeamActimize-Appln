import * as types from '../actions/actionTypes';

const initialState = {
    createProjectWiseDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const projectWiseDetailsReducer = (state = initialState.createProjectWiseDetails, action)=>{
    switch (action.type) {
            case types.LOAD_PROJECTSWISE_DETAILS_START:          
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_PROJECTSWISE_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_PROJECTSWISE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
            default:
            return state;
    }
}
export default projectWiseDetailsReducer