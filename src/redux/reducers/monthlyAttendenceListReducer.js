import * as types from '../actions/actionTypes';

const initialState = {
    createMonthlyAttendenceSelectDetails: {
        users: [],
        token: null,
        data: [],
        loading: false,
           },
};
const MonthlyAttendenceListSelectDetailsReducer = (state = initialState.createMonthlyAttendenceSelectDetails, action)=>{
    switch (action.type) {                
            case types.LOAD_MONTHLYATTENDENCELIST_DETAILS_START:
                  return {
                      ...state,
                      loading: true
                  };
              
              case types.LOAD_MONTHLYATTENDENCELIST_DETAILS_SUCCESS:
                  return {
                      ...state,
                      loading: false ,
                      data:action.payload
                      };
              case types.LOAD_MONTHLYATTENDENCELIST_DETAILS_ERROR:
                  return {
                      ...state,
                      loading: false ,
                      error:action.payload
                      }; 
    
            default:
            return state;
    }

}
export default MonthlyAttendenceListSelectDetailsReducer