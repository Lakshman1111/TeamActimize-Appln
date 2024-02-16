import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createProjectDetailsApi, deleteProjectDetailsApi, loadProjectDetailsApi, updateProjectDetailsApi } from '../apis/expertprojectDetailsApi';
import { createProjectDetailsError, createProjectDetailsSuccess, deleteProjectDetailsError, deleteProjectDetailsSuccess, loadProjectDetailsError, loadProjectDetailsSuccess, updateProjectDetailsError, updateProjectDetailsSuccess } from '../actions/expertProjectDetailsActions';
export function* onCreateProjectDetailsStartAsync ({payload}){
        try {
            const response = yield call(createProjectDetailsApi,payload);
            if (response.status === 201) {
                yield put(createProjectDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createProjectDetailsError(error.response.data));
        }
}
export function* onCreateProjectDetails(){
    yield takeLatest(types.CREATE_PROJECT_DETAILS_START,onCreateProjectDetailsStartAsync);
}
//getting data
export function* onLoadProjectDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadProjectDetailsApi,page);
            if (response.status === 200) {
                yield put(loadProjectDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadProjectDetailsError(error.response.data)); 
        }
}

export function* onLoadProjectDetails(){
    yield takeEvery(types.LOAD_PROJECT_DETAILS_START,onLoadProjectDetailsStartAsync);
}
//deleting data
export function* onDeleteprojectDetailsStartAsync (userId){
        try {
            const response = yield call(deleteProjectDetailsApi,userId);
            if (response.status === 201) {
                yield put(deleteProjectDetailsSuccess(userId));
            }
        } catch (error) {
            yield put(deleteProjectDetailsError(error.response))
        }
}

export function* onDeleteProjectDetails(){
    while (true) {
        const {payload : userId} =  yield take(types.DELETE_PROJECT_DETAILS_START ,);
        yield call(onDeleteprojectDetailsStartAsync, userId);
    }
}
// updating data

export function* onUpdateProjectDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;

try {
    const response = yield call(updateProjectDetailsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateProjectDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateProjectDetailsError(error.response.data));
}
}
export function* onUpdateProjectDetails(){
    yield takeLatest(types.UPDATE_PROJECT_DETAILS_START,onUpdateProjectDetailsStartAsync);
}