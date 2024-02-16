import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import { 
    createEmergencyDetailsSuccess,
    createEmergencyDetailsError,
    loadEmergencyDetailsSuccess,
    loadEmergencyDetailsError,
    updateEmergencyDetailsSuccess,
    updateEmergencyDetailsError,
    deleteEmergencyDetailsSuccess,
    deleteEmergencyDetailsError,
} from '../actions/emergencyDetailsActions';
import * as types from '../actions/actionTypes';
import {
    createEmergencyDetailsApi,
    loadEmergencyDetailsApi,
    deleteEmergencyDetailsApi,
    updateEmergencyDetailsApi,
} from '../apis/emergencyDetailsApi';
//adding data
export function* onCreateEmergencyDetailsStartAsync ({payload}){
        try {
            const response = yield call(createEmergencyDetailsApi,payload);
            if (response.status === 200) {
                yield put(createEmergencyDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createEmergencyDetailsError(error.response.data));            
        }
}
export function* onCreateEmergencyDetails(){
    yield takeLatest(types.CREATE_EMERGENCY_DETAILS_START,onCreateEmergencyDetailsStartAsync);
}
//getting data
export function* onLoadEmergencyDetailsStartAsync (){
        try {
            const response = yield call(loadEmergencyDetailsApi);
          
            if (response.status === 200) {
                yield put(loadEmergencyDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadEmergencyDetailsError(error.response.data));
            
        }
}

export function* onLoadEmergencyDetails(){
    yield takeEvery(types.LOAD_EMERGENCY_DETAILS_START,onLoadEmergencyDetailsStartAsync);
}
//deleting data
export function* onDeleteEmergencyDetailsStartAsync (userId){
        try {
            const response = yield call(deleteEmergencyDetailsApi,userId);
            if (response.status === 201) {
                yield put(deleteEmergencyDetailsSuccess(userId));
            }
        } catch (error) {
            yield put(deleteEmergencyDetailsError(error.response));
            
        }
}

export function* onDeleteEmergencyDetails(){
    while (true) {
        
        const {payload : userId} =  yield take(types.DELETE_EMERGENCY_DETAILS_START,);
        yield call(onDeleteEmergencyDetailsStartAsync, userId);
    }
}
// updating data

export function* onUpdateEmergencyDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;

try {
    const response = yield call(updateEmergencyDetailsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateEmergencyDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateEmergencyDetailsError(error.response.data));
}
}
export function* onUpdateEmergencyDetails(){
    yield takeLatest(types.UPDATE_EMERGENCY_DETAILS_START,onUpdateEmergencyDetailsStartAsync);
}


    
 

