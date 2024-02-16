import { STORE_API_RESULT } from "../actions/actionTypes";
const initialState = {
  apiResult: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_API_RESULT:
      return {
        ...state,
        apiResult: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;