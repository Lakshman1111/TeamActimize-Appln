import * as types from '../actions/actionTypes';

const initialState = {
    createAttendenceListDetails: {
        users: [],
        updatedData:[],
        token: null,
        data: [],
        loading: false,
    },
};

const AttendenceListDetailsReducer = (state = initialState.createAttendenceListDetails, action) => {
    switch (action.type) {
        case types.CREATE_ATTENDENCELIST_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.CREATE_ATTENDENCELIST_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.CREATE_ATTENDENCELIST_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.LOAD_ATTENDENCELIST_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.LOAD_ATTENDENCELIST_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case types.LOAD_ATTENDENCELIST_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.UPDATE_ATTENDENCELIST_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_ATTENDENCELIST_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case types.UPDATE_ATTENDENCELIST_DETAILS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default AttendenceListDetailsReducer;
