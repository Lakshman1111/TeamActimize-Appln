import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';
import {
    createSkillDetailsSuccess,
    createSkillDetailsError,
    loadSkillDetailsSuccess,
    loadSkillDetailsError,
    updateSkillDetailsSuccess,
    updateSkillDetailsError,
    deleteSkillDetailsSuccess,
    deleteSkillDetailsError,
} from '../actions/skillActions';
import * as types from '../actions/actionTypes';
import {
    createSkillDetailsApi,
    loadSkillDetailsApi,
    deleteSkillDetailsApi,
    updateSkillDetailsApi
} from '../apis/skillApi';
//adding data
export function* onCreateSkillDetailsStartAsync({ payload }) {
    try {
        const response = yield call(createSkillDetailsApi, payload);
        if (response.status === 201) {
            yield put(createSkillDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(createSkillDetailsError(error.response.data));
    }
}
export function* onCreateSkillDetails() {
    yield takeLatest(types.CREATE_SKILLS_DETAILS_START, onCreateSkillDetailsStartAsync);
}
//getting data
export function* onLoadSkillDetailsStartAsync(action) {
    try {
        const { page } = action.payload;
        const response = yield call(loadSkillDetailsApi, page);
        if (response.status === 200) {
            yield put(loadSkillDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadSkillDetailsError(error.response.data));
    }
}
export function* onLoadSkillDetails() {
    yield takeEvery(types.LOAD_SKILLS_DETAILS_START, onLoadSkillDetailsStartAsync);
}
//deleting data
export function* onDeleteSkillDetailsStartAsync(userId) {
    try {
        const response = yield call(deleteSkillDetailsApi, userId);
        if (response.status === 201) {
            yield put(deleteSkillDetailsSuccess(userId));
        }
    } catch (error) {
        yield put(deleteSkillDetailsError(error.response));
    }
}
export function* onDeleteSkillDetails() {
    while (true) {
        const { payload: userId } = yield take(types.DELETE_SKILLS_DETAILS_START,);
        yield call(onDeleteSkillDetailsStartAsync, userId);
    }
}
// updating data
export function* onUpdateSkillDetailsStartAsync(payload) {
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;
    try {
        const response = yield call(updateSkillDetailsApi, id, payloadData);
        if (response.status === 200) {
            yield put(updateSkillDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(updateSkillDetailsError(error.response.data));
    }
}
export function* onUpdateSkillDetails() {
    yield takeLatest(types.UPDATE_SKILLS_DETAILS_START, onUpdateSkillDetailsStartAsync);
}





