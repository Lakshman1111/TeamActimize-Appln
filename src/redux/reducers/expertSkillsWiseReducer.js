import * as types from '../actions/actionTypes';

const initialState = {
    createSkillsWiseDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const skillsWiseDetailsReducer = (state = initialState.createSkillsWiseDetails, action)=>{
    switch (action.type) {
            case types.LOAD_SKILLWISE_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.LOAD_SKILLWISE_DETAILS_SUCCESS:    
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_SKILLWISE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
            default:
            return state;
    }

}
export default skillsWiseDetailsReducer