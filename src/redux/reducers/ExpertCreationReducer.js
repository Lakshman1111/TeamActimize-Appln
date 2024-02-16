import * as types from '../actions/actionTypes';

const initialState = {
    createExpertCreation: {
        users: [],
        token: null,
        loading: false,
    },
};
const expertCreationReducer = (state = initialState.createExpertCreation, action) => {
    switch (action.type) {
      case types.CREATE_EXPERT_CREATION_START:
        return {
          ...state,
          loading: true,
        };
      case types.CREATE_EXPERT_CREATION_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case types.CREATE_EXPERT_CREATION_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
export default expertCreationReducer;