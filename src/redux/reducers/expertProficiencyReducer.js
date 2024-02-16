import * as types from '../actions/actionTypes';

const initialState = {
    createProficiencyDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const proficiencyDetailsReducer = (state = initialState.createProficiencyDetails, action)=>{
    switch (action.type) {
            case types.LOAD_PROFICIENCY_DETAILS_START:         
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_PROFICIENCY_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_PROFICIENCY_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };  
            default:
            return state;
    }
}
export default proficiencyDetailsReducer