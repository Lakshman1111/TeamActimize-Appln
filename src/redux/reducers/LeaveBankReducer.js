import * as types from '../actions/actionTypes';

const initialState = {
  createLeaveBank: {
    users: [],
    token: null,
    loading: false,
  },
};
const leaveBankReducer = (state = initialState.createLeaveBank, action) => {
  switch (action.type) {
    case types.CREATE_LEAVE_BANK_START:
      return {
        ...state,
        loading: true,
      };
    case types.CREATE_LEAVE_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.CREATE_LEAVE_BANK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.LOAD_LEAVE_BANK_START:
      return {
        ...state,
        loading: true,
      };

    case types.LOAD_LEAVE_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case types.LOAD_LEAVE_BANK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //updating existing user details
    case types.UPDATE_LEAVE_BANK_START:
      return {
        ...state,
        loading: true
      };
    case types.UPDATE_LEAVE_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.UPDATE_LEAVE_BANK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    //deleting family details  details
    case types.DELETE_LEAVE_BANK_START:
      return {
        ...state,
        loading: true
      };
    case types.DELETE_LEAVE_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        users: state.users.filter((item) => item.id !== action.payload),
      };
    case types.DELETE_LEAVE_BANK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    //updating existing user details
    default:
      return state;
  }
};

export default leaveBankReducer;