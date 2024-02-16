import * as types from '../actions/actionTypes';

const initialState = {
    createProficiencySelectDetails: {
        users: [],
        token: null,
        data: [],
        loading: false,
           },
};
const proficiencySelectDetailsReducer = (state = initialState.createProficiencySelectDetails, action)=>{
    switch (action.type) {                
            case types.LOAD_PROFICIENCYSELECT_DETAILS_START:        
                  return {
                      ...state,
                      loading: true
                  };
              
              case types.LOAD_PROFICIENCYSELECT_DETAILS_SUCCESS:         
                  return {
                      ...state,
                      loading: false ,
                      data:action.payload
                      };
              case types.LOAD_PROFICIENCYSELECT_DETAILS_ERROR:
                  return {
                      ...state,
                      loading: false ,
                      error:action.payload
                      }; 
            default:
            return state;
    }
}
export default proficiencySelectDetailsReducer