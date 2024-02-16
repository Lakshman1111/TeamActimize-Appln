import * as types from '../actions/actionTypes';

const initialState = {
    createWorkExperienceWiseDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const workExperienceWiseDetailsReducer = (state = initialState.createWorkExperienceWiseDetails, action)=>{
    switch (action.type) {
            case types.LOAD_WORKEXPERIENCEWISE_DETAILS_START:          
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_WORKEXPERIENCEWISE_DETAILS_SUCCESS:          
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_WORKEXPERIENCEWISE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
            default:
            return state;
    }

}
export default workExperienceWiseDetailsReducer