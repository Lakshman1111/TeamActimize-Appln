import * as types from '../actions/actionTypes';

const initialState = {
    createHoursEntryDetails: {
        users: [],
        token: null,
        loading: false,
    },
};
const hoursEntryDetailsReducer = (state = initialState.createHoursEntryDetails, action) => {
    switch (action.type) {
        case types.CREATE_HOURSENTRY_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.CREATE_HOURSENTRY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.CREATE_HOURSENTRY_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case types.LOAD_HOURSENTRY_DETAILS_START:

            return {
                ...state,
                loading: true
            };

        case types.LOAD_HOURSENTRY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case types.LOAD_HOURSENTRY_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case types.UPDATE_HOURSENTRY_DETAILS_START:

            return {
                ...state,
                updatedData: action.payload,
                loading: true
            };
        case types.UPDATE_HOURSENTRY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.UPDATE_HOURSENTRY_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default: return state;
    }

}
export default hoursEntryDetailsReducer;
