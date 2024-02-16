import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createGadgetDetailsApi, deleteGadgetDetailsApi, loadGadgetDetailsApi, updateGadgetDetailsApi } from '../apis/ExpertGadgetDetailsApi';
import { createGadgetDetailsError, createGadgetDetailsSuccess, deleteGadgetDetailsError, deleteGadgetDetailsSuccess, loadGadgetDetailsError, loadGadgetDetailsSuccess, updateGadgetDetailsError, updateGadgetDetailsSuccess } from '../actions/expertGadgetsActions';
export function* onCreateGadgetDetailsStartAsync ({payload}){
        try {
            const response = yield call(createGadgetDetailsApi,payload);
            if (response.status === 201) {
                yield put(createGadgetDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createGadgetDetailsError(error.response.data));
            
        }
}
export function* onCreateGadgetDetails(){
    yield takeLatest(types.CREATE_GADGETS_DETAILS_START,onCreateGadgetDetailsStartAsync);
}
//getting data
export function* onLoadGadgetDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadGadgetDetailsApi,page);
            if (response.status === 200) {
                yield put(loadGadgetDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadGadgetDetailsError(error.response.data)); 
        }
}
export function* onLoadGadgetDetails(){
    yield takeEvery(types.LOAD_GADGETS_DETAILS_START,onLoadGadgetDetailsStartAsync);
}
//deleting data
export function* onDeleteGadgetDetailsStartAsync (userId){
        try {
            const response = yield call(deleteGadgetDetailsApi,userId);
            if (response.status === 201) {
                yield put(deleteGadgetDetailsSuccess(userId));
            }
        } catch (error) {
            yield put(deleteGadgetDetailsError(error.response))
        }
}

export function* onDeleteGadgetDetails(){
    while (true) {
        const {payload : userId} =  yield take(types.DELETE_GADGETS_DETAILS_START,);
        yield call(onDeleteGadgetDetailsStartAsync, userId);
    }
}
// updating data
export function* onUpdateGadgetDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;

try {
    const response = yield call(updateGadgetDetailsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateGadgetDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateGadgetDetailsError(error.response.data));
}
}
export function* onUpdateGadgetDetails(){
    yield takeLatest(types.UPDATE_GADGETS_DETAILS_START,onUpdateGadgetDetailsStartAsync);
}


    



