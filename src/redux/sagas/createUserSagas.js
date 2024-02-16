import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createUserSuccess,
    createUserError,
    createProfileSuccess,
    createProfileError,
} from '../actions/createUserActions';
import * as types from '../actions/actionTypes';
// import {createUserApi,updateUserApi} from '../apis/createUserApi';
import { createProfileApi, createUserApi } from '../apis/createUserApi';
export function* onCreateUserStartAsync({ payload }) {
    try {
        const response = yield call(createUserApi, payload);
        if (response.status === 201) {
            yield put(createUserSuccess(response.data));
        }
    } catch (error) {
        yield put(createUserError(error.response))
    }
}
export function* onCreateUser() {
    yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}
export function* onCreateProfileStartAsync({ payload }) {
    try {
        const response = yield call(createProfileApi, payload);
        if (response.status === 201) {
            yield put(createProfileSuccess(response.data));
        }
    } catch (error) {
        yield put(createProfileError(error.response))
    }
}
export function* onCreateprofile() {
    yield takeLatest(types.CREATE_PROFILE_START, onCreateProfileStartAsync);
}

