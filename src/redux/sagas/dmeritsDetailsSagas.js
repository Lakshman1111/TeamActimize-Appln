import { call, put, takeEvery, take, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createDmeritsDetailsApi, loadDmeritsDetailsApi, updateDmeritsDetailsApi } from '../apis/ExpertDmeritsApi';
import { createDmeritsDetailsError, createDmeritsDetailsStart, loadDmeritsDetailsSuccess, loadDmeritsDetailsError, updateDmeritsDetailsSuccess, updateDmeritsDetailsError } from '../actions/expertDmeritsActions';
//adding data
export function* onCreateDmeritsDetailsStartAsync({ payload }) {
  try {
    const response = yield call(createDmeritsDetailsApi, payload);
    console.log('API Response:', response); // Log the API response
    if (response.status === 200) {
      yield put(createDmeritsDetailsStart(response));
    }
  } catch (error) {
    console.error('API Error:', error); // Log the API error
    yield put(createDmeritsDetailsError(error.response));
  }
}
export function* onCreateDmeritsDetails() {
  yield takeLatest(types.CREATE_DMERITS_DETAILS_START, onCreateDmeritsDetailsStartAsync);
}
//getting data
export function* onLoadDmeritsDetailsStartAsync(action) {
  const { page } = action.payload;
  try {
    const response = yield call(loadDmeritsDetailsApi, page);
    if (response.status === 200) {
      yield put(loadDmeritsDetailsSuccess(response.data));
    }
  } catch (error) {
    yield put(loadDmeritsDetailsError(error.response.data));
  }
}
export function* onLoadDmeritsDetails() {
  yield takeEvery(types.LOAD_DMERITS_DETAILS_START, onLoadDmeritsDetailsStartAsync);
}
export function* onUpdateDmeritsDetailsStartAsync(payload) {

  let id = payload.payload[0].id;
  const payloadData = payload.payload[0];

  try {
    const response = yield call(updateDmeritsDetailsApi, id, payloadData);
    if (response.status === 200) {
      yield put(updateDmeritsDetailsSuccess(response.data));
    }
  } catch (error) {
    yield put(updateDmeritsDetailsError(error.response.data));
  }
}

export function* onUpdateDmeritsDetails() {
  yield takeLatest(types.UPDATE_DMERITS_DETAILS_START, onUpdateDmeritsDetailsStartAsync);
}
