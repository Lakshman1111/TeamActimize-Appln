import {call,put,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createAttendenceListDetailsApi, loadAttendenceListDetailsApi, updateAttendenceListDetailsApi } from '../apis/expertAttendenceListApi';
import { createAttendenceListDetailsError, createAttendenceListDetailsSuccess, loadAttendenceListDetailsError, loadAttendenceListDetailsSuccess, updateAttendenceListDetailsError, updateAttendenceListDetailsSuccess } from '../actions/expertAttendencelistActions';
export function* onCreateAttendenceListDetailsStartAsync({ payload }) {
    try {
      console.log('Payload create attendence list:', payload)   ; // Add console log here to log the payload
      const response = yield call(createAttendenceListDetailsApi, payload);
      if (response.status === 201) {
        yield put(createAttendenceListDetailsSuccess(response.data));
      }
    } catch (error) {
      yield put(createAttendenceListDetailsError(error.response.data));
    }
  }
  export function* onCreateAttendenceListDetails() {
    yield takeLatest(types.CREATE_ATTENDENCELIST_DETAILS_START, onCreateAttendenceListDetailsStartAsync);
  }
//getting data
export function* onLoadAttendenceListDetailsStartAsync (action){
        try {
            const {date} = action.payload;
            const response = yield call(loadAttendenceListDetailsApi,date);
            if (response.status === 200) {
                yield put(loadAttendenceListDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadAttendenceListDetailsError(error.response.data)); 
        }
}
export function* onLoadAttendenceListDetails(){
    yield takeEvery(types.LOAD_ATTENDENCELIST_DETAILS_START,onLoadAttendenceListDetailsStartAsync);
}
function* onUpdateAttendenceListDetailsStartAsync(payload) {
  const { updatedData, anyid } = payload.payload; 
  try {
    console.log('Received updatedData:', updatedData); // Log the received data
    const response = yield call(updateAttendenceListDetailsApi, updatedData,anyid);
    if (response.status === 200) {
      yield put(updateAttendenceListDetailsSuccess(response.data));
    }
  } catch (error) {
    yield put(updateAttendenceListDetailsError(error.response.data));
  }
}
export function* onUpdateAttendenceListDetails() {
  yield takeLatest(
    types.UPDATE_ATTENDENCELIST_DETAILS_START,
    onUpdateAttendenceListDetailsStartAsync
  );
}