import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    createStatusDetailsSuccess,
    createStatusDetailsError,
    loadStatusDetailsSuccess,
    loadStatusDetailsError,
    updateStatusDetailsSuccess,
    updateStatusDetailsError,
    deleteStatusDetailsSuccess,
    deleteStatusDetailsError,
} from '../actions/dailyStatusActions';
import * as types from '../actions/actionTypes';
import {
    createStatusDetailsApi,
    loadStatusDetailsApi,
    deleteStatusDetailsApi,
    updateStatusDetailsApi
} from '../apis/dailyStatusApi';
//adding data
export function* onCreateStatusDetailsStartAsync({ payload }) {
    try {
        const response = yield call(createStatusDetailsApi, payload);
        if (response.status === 201) {
            yield put(createStatusDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(createStatusDetailsError(error.response.data));

    }
}

export function* onCreateStatusDetails() {
    yield takeLatest(types.CREATE_DAILYSTATUS_DETAILS_START, onCreateStatusDetailsStartAsync);
}

//getting data
export function* onLoadStatusDetailsStartAsync(action) {
    try {
        const { page } = action.payload;
        const response = yield call(loadStatusDetailsApi, page);
        if (response.status === 200) {
            yield put(loadStatusDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadStatusDetailsError(error.response.data));

    }
}

export function* onLoadStatusDetails() {
    yield takeEvery(types.LOAD_DAILYSTATUS_DETAILS_START, onLoadStatusDetailsStartAsync);
}

//deleting data
export function* onDeleteStatusDetailsStartAsync(userId) {
    try {
        const response = yield call(deleteStatusDetailsApi, userId);
        if (response.status === 201) {
            yield put(deleteStatusDetailsSuccess(userId));
        }
    } catch (error) {
        yield put(deleteStatusDetailsError(error.response));

    }
}
export function* onDeleteStatusDetails() {
    while (true) {
        const { payload: userId } = yield take(types.DELETE_DAILYSTATUS_DETAILS_START,);
        yield call(onDeleteStatusDetailsStartAsync, userId);
    }
}
// updating data

export function* onUpdateStatusDetailsStartAsync(payload) {
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;
    try {
        const response = yield call(updateStatusDetailsApi, id, payloadData);
        if (response.status === 200) {
            yield put(updateStatusDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(updateStatusDetailsError(error.response.data));

    }
}
export function* onUpdateStatusDetails() {
    yield takeLatest(types.UPDATE_DAILYSTATUS_DETAILS_START, onUpdateStatusDetailsStartAsync);
}
