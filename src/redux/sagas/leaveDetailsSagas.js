import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { 
    createLeaveDetailsSuccess,
    createLeaveDetailsError,
    loadLeaveDetailsSuccess,
    loadLeaveDetailsError,
    updateLeaveDetailsSuccess,
    updateLeaveDetailsError,
    deleteLeaveDetailsSuccess,
    deleteLeaveDetailsError,
} from '../actions/leaveDetailsActions';
import {
    createLeaveDetailsApi,
    loadLeaveDetailsApi,
    deleteLeaveDetailsApi,
    updateLeaveDetailsApi
} from '../apis/LeaveDetailsApi';
//adding data
export function* onCreateLeaveDetailsStartAsync ({payload}){
        try {
            const response = yield call(createLeaveDetailsApi,payload);
            if (response.status === 201) {
                yield put(createLeaveDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createLeaveDetailsError(error.response.data));
            
        }
}
export function* onCreateLeaveDetails(){
    yield takeLatest(types.CREATE_LEAVES_DETAILS_START,onCreateLeaveDetailsStartAsync);
}
//getting data
export function* onLoadLeaveDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadLeaveDetailsApi,page);
            if (response.status === 200) {
                yield put(loadLeaveDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadLeaveDetailsError(error.response.data));
            
        }
}
export function* onLoadLeaveDetails(){
    yield takeEvery(types.LOAD_LEAVES_DETAILS_START,onLoadLeaveDetailsStartAsync);
}
//deleting data
export function* onDeleteLeaveDetailsStartAsync (userId){
        try {
            const response = yield call(deleteLeaveDetailsApi,userId);
            if (response.status === 201) {
                yield put(deleteLeaveDetailsSuccess(userId));
            }
        } catch (error) {
            yield put(deleteLeaveDetailsError(error.response));
            
        }
}
export function* onDeleteLeaveDetails(){
    while (true) {
        
        const {payload : userId} =  yield take(types.DELETE_LEAVES_DETAILS_START,);
        yield call(onDeleteLeaveDetailsStartAsync, userId);
    }
}
// updating data
export function* onUpdateLeaveDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0];

try {
    const response = yield call(updateLeaveDetailsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateLeaveDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateLeaveDetailsError(error.response.data));   
}}
export function* onUpdateLeaveDetails(){
    yield takeLatest(types.UPDATE_LEAVES_DETAILS_START,onUpdateLeaveDetailsStartAsync);
}


    
 

