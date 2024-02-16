import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createEventManDetailsApi, deleteEventManDetailsApi, loadEventManDetailsApi, updateEventManDetailsApi } from '../apis/ExpertEventmanApi';
import { createEventmanDetailsError, createEventmanDetailsSuccess, deleteEventmanDetailsError, deleteEventmanDetailsSuccess, loadEventmanDetailsError, loadEventmanDetailsSuccess, updateEventmanDetailsError, updateEventmanDetailsSuccess } from '../actions/expertEventmanActions';
export function* onCreateEventManDetailsStartAsync ({payload}){
        try {
            const response = yield call(createEventManDetailsApi,payload);
            if (response.status === 201) {
                yield put(createEventmanDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createEventmanDetailsError(error.response.data));
            
        }
}
export function* onCreateEventManDetails(){
    yield takeLatest(types.CREATE_EVENTMAN_DETAILS_START,onCreateEventManDetailsStartAsync);
}
// getting data
export function* onLoadEventmanDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadEventManDetailsApi,page);
            if (response.status === 200) {
                yield put(loadEventmanDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadEventmanDetailsError(error.response.data)); 
        }
}
export function* onLoadEventmanDetails(){
    yield takeEvery(types.LOAD_EVENTMAN_DETAILS_START,onLoadEventmanDetailsStartAsync);
}
//deleting data
export function* onDeleteEventmanDetailsStartAsync (userId){
        try {
            const response = yield call(deleteEventManDetailsApi,userId);
            if (response.status === 201) {
                yield put(deleteEventmanDetailsSuccess(userId));
            }
        } catch (error) {
            yield put(deleteEventmanDetailsError(error.response))
        }
}
export function* onDeleteEventmanDetails(){
    while (true) {
        const {payload : userId} =  yield take(types.DELETE_EVENTMAN_DETAILS_START,);
        yield call(onDeleteEventmanDetailsStartAsync, userId);
    }
}
// updating data

export function* onUpdateEventmanDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;

try {
    const response = yield call(updateEventManDetailsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateEventmanDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateEventmanDetailsError(error.response.data));
}
}
export function* onUpdateEventmanDetails(){
    yield takeLatest(types.UPDATE_EVENTMAN_DETAILS_START,onUpdateEventmanDetailsStartAsync);
}