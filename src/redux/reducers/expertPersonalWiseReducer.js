import * as types from '../actions/actionTypes';
const initialState = {
    createPersonalWiseDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const personalWiseDetailsReducer = (state = initialState.createPersonalWiseDetails, action)=>{
    switch (action.type) {
            case types.LOAD_PERSONALWISE_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.LOAD_PERSONALWISE_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_PERSONALWISE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
            default:
            return state;
    }
}
export default personalWiseDetailsReducer