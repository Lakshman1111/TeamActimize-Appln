import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import { 
    createMyProjectsDetailsSuccess,
    createMyProjectsDetailsError,
    loadMyProjectsDetailsSuccess,
    loadMyProjectsDetailsError,
    updateMyProjectsDetailsSuccess,
    updateMyProjectsDetailsError,
    deleteMyProjectsDetailsSuccess,
    deleteMyProjectsDetailsError,
} from '../actions/myProjectsActions';
import * as types from '../actions/actionTypes';
import {
    createMyProjectsApi,
    loadMyProjectsApi,
    deleteMyProjectsApi,
    updateMyProjectsApi
} from '../apis/myProjectsApi';
//adding data
export function* onCreateMyProjectsDetailsStartAsync ({payload}){
    try {
        const response = yield call(createMyProjectsApi,payload);
            if (response.status === 201) {
                yield put(createMyProjectsDetailsSuccess(response));
            }
        } catch (error) {
            yield put(createMyProjectsDetailsError(error.response));
        }
}

export function* onCreateMyProjectsDetails(){
    yield takeLatest(types.CREATE_MYPROJECTS_DETAILS_START,onCreateMyProjectsDetailsStartAsync);
}

//getting data
export function* onLoadMyProjectsDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadMyProjectsApi,page);
            if (response.status === 200) {
                yield put(loadMyProjectsDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadMyProjectsDetailsError(error.response.data));
        }
}

export function* onLoadMyProjectsDetails(){
    yield takeEvery(types.LOAD_MYPROJECTS_DETAILS_START,onLoadMyProjectsDetailsStartAsync);
}

//deleting data
export function* onDeleteMyProjectsDetailsStartAsync (userId){
        try {
            const response = yield call(deleteMyProjectsApi,userId);
            if (response.status === 201) {
                yield put(deleteMyProjectsDetailsSuccess(userId));
            }
        } catch (error) {
            yield put(deleteMyProjectsDetailsError(error.response));
        }
}
export function* onDeleteMyProjectsDetails(){
    while (true) { 
        const {payload : userId} =  yield take(types.DELETE_MYPROJECTS_DETAILS_START,);
        yield call(onDeleteMyProjectsDetailsStartAsync, userId);
    }
}
// updating data

export function* onUpdateMyProjectsDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;
try {
    const response = yield call(updateMyProjectsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateMyProjectsDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateMyProjectsDetailsError(error.response.data));
    
}
}
export function* onUpdateMyProjectsDetails(){
    yield takeLatest(types.UPDATE_MYPROJECTS_DETAILS_START,onUpdateMyProjectsDetailsStartAsync);
}
