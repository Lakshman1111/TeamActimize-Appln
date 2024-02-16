import * as types from '../actions/actionTypes';

const initialState = {
    createFamilyWiseDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const familyWiseDetailsReducer = (state = initialState.createFamilyWiseDetails, action)=>{
    switch (action.type) {
            case types.LOAD_FAMILYWISE_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_FAMILYWISE_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_FAMILYWISE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
    
            default:
            return state;
    }
}
export default familyWiseDetailsReducer