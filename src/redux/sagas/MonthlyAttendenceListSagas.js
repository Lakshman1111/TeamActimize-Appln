import {call,put,takeEvery,} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadMonthlyAttendenceDetailsError, loadMonthlyAttendenceDetailsSuccess } from '../actions/expertMonthlyAttenListActions';
import { loadMonthlyAttendenceListDetailsApi } from '../apis/expertMonthlyAttenListApi';
//getting data
export function* onLoadMonthlyAttendenceListDetailsStartAsync (action){
        try {
            const { month } = action.payload;;
            const response = yield call(loadMonthlyAttendenceListDetailsApi,month);
            if (response.status === 200) {
                yield put(loadMonthlyAttendenceDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadMonthlyAttendenceDetailsError(error.response.data)); 
        }
}
export function* onLoadmonthlyAttendenceListDetails(){
    yield takeEvery(types.LOAD_MONTHLYATTENDENCELIST_DETAILS_START,onLoadMonthlyAttendenceListDetailsStartAsync);
}
