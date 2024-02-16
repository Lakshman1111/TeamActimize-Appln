import * as types from '../actions/actionTypes';

const initialState = {
    createPerformanceDetails: {
        users: [],
        token: null,
        loading: false,
    },
};
const performanceDetailsReducer = (state = initialState.createPerformanceDetails, action) => {
    switch (action.type) {
      case types.CREATE_PERFORMANCE_DETAILS_START:
        return {
          ...state,
          loading: true,
        };
      case types.CREATE_PERFORMANCE_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case types.CREATE_PERFORMANCE_DETAILS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case types.LOAD_PERFORMANCE_DETAILS_START:
        return {
          ...state,
          loading: true,
        };
  
      case types.LOAD_PERFORMANCE_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      case types.LOAD_PERFORMANCE_DETAILS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
                  //updating existing user details
                  case types.UPDATE_PERFORMANCE_DETAILS_START:
                    return {
                        ...state,
                        loading:true
                    };
                case types.UPDATE_PERFORMANCE_DETAILS_SUCCESS:
                    return {
                        ...state,
                        loading:false,
                    };
                case types.UPDATE_PERFORMANCE_DETAILS_ERROR:
                  return {
                    ...state,
                    loading:false ,
                    error:action.payload
                };   
                default:
        return state;
    }
  };
  
export default performanceDetailsReducer;