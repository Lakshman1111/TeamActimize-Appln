import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createHolidayDetailsApi, deleteHolidayDetailsApi, loadHolidayDetailsApi, updateHolidayDetailsApi } from '../apis/ExpertHolidaysApi';
import { createHolidayDetailsError, createHolidayDetailsSuccess, deleteHolidayDetailsError, deleteHolidayDetailsSuccess, loadHolidayDetailsError, loadHolidayDetailsSuccess, updateHolidayDetailsError, updateHolidayDetailsSuccess } from '../actions/expertHolidaysActions';


export function* onCreateHolidayDetailsStartAsync ({payload}){
        try {
            const response = yield call(createHolidayDetailsApi,payload);
            if (response.status === 201) {
                yield put(createHolidayDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createHolidayDetailsError(error.response.data));
            
        }
}
export function* onCreateHolidayDetails(){
    yield takeLatest(types.CREATE_HOLIDAYS_DETAILS_START,onCreateHolidayDetailsStartAsync);
}
//getting data
export function* onLoadHolidayDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadHolidayDetailsApi,page);
            if (response.status === 200) {
                yield put(loadHolidayDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadHolidayDetailsError(error.response.data)); 
        }
}
export function* onLoadHolidayDetails(){
    yield takeEvery(types.LOAD_HOLIDAYS_DETAILS_START,onLoadHolidayDetailsStartAsync);
}
//deleting data
export function* onDeleteHolidayDetailsStartAsync (userId){
        try {
            const response = yield call(deleteHolidayDetailsApi,userId);
            if (response.status === 201) {
                yield put(deleteHolidayDetailsSuccess(userId));
            }
        } catch (error) {
            yield put(deleteHolidayDetailsError(error.response))
        }
}

export function* onDeleteHolidayDetails(){
    while (true) {
        const {payload : userId} =  yield take(types.DELETE_HOLIDAYS_DETAILS_START,);
        yield call(onDeleteHolidayDetailsStartAsync, userId);
    }
}
// updating data

export function* onUpdateHolidayDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;

try {
    const response = yield call(updateHolidayDetailsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateHolidayDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateHolidayDetailsError(error.response.data));
}
}
export function* onUpdateHolidayDetails(){
    yield takeLatest(types.UPDATE_HOLIDAYS_DETAILS_START,onUpdateHolidayDetailsStartAsync);
}


    
 

