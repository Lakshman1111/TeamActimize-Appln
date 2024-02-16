import * as types from '../actions/actionTypes';
const initialState = {
    createDmeritsDetails: {
        users: [],
        token: null,
        loading: false,
    },
};
const dmeritsDetailsReducer = (state = initialState.createDmeritsDetails, action) => {
    switch (action.type) {
      case types.CREATE_DMERITS_DETAILS_START:
        return {
          ...state,
          loading: true,
        };
      case types.CREATE_DMERITS_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case types.CREATE_DMERITS_DETAILS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case types.LOAD_DMERITS_DETAILS_START:
        return {
          ...state,
          loading: true,
        };
  
      case types.LOAD_DMERITS_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
  
      case types.LOAD_DMERITS_DETAILS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
                  case types.UPDATE_DMERITS_DETAILS_START:
                    return {
                        ...state,
                        loading: true
                    };
                case types.UPDATE_DMERITS_DETAILS_SUCCESS:
                    return {
                        ...state,
                        loading: false ,
                    };
                case types.UPDATE_DMERITS_DETAILS_ERROR:
                  return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };   
                default:
        return state;
    }
  };
  
export default dmeritsDetailsReducer;