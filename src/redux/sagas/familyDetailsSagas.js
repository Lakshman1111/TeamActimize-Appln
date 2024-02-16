import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import { 
    createFamilyDetailsSuccess,
    createFamilyDetailsError,
    loadFamilyDetailsSuccess,
    loadFamilyDetailsError,
    updateFamilyDetailsSuccess,
    updateFamilyDetailsError,
    deleteFamilyDetailsSuccess,
    deleteFamilyDetailsError,
} from '../actions/familyDetailsActions';
import * as types from '../actions/actionTypes';
import {createFamilyDetailsApi,
        loadFamilyDetailsApi,
        deleteFamilyDetailsApi,
        updateFamilyDetailsApi} from '../apis/familyDetailsApi';
//adding data
export function* onCreateFamilyDetailsStartAsync ({payload}){
        try {
            const response = yield call(createFamilyDetailsApi,payload);
            if (response.status === 200) {
                yield put(createFamilyDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createFamilyDetailsError(error.response.data));
            
        }
}

export function* onCreateFamilyDetails(){
    yield takeLatest(types.CREATE_FAMILY_DETAILS_START,onCreateFamilyDetailsStartAsync);
}

//getting data
export function* onLoadFamilyDetailsStartAsync (){
        try {
            const response = yield call(loadFamilyDetailsApi);
            if (response.status === 200) {
                yield put(loadFamilyDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadFamilyDetailsError(error.response.data));
            
        }
}

export function* onLoadFamilyDetails(){
    yield takeEvery(types.LOAD_FAMILY_DETAILS_START,onLoadFamilyDetailsStartAsync);
}
//deleting data
export function* onDeleteFamilyDetailsStartAsync (userId){
        try {
            const response = yield call(deleteFamilyDetailsApi,userId);
            if (response.status === 201) {
                yield put(deleteFamilyDetailsSuccess(userId));
            }
        } catch (error) {
            yield put(deleteFamilyDetailsError(error.response));
            
        }
}

export function* onDeleteFamilyDetails(){
    while (true) {
        
        const {payload : userId} =  yield take(types.DELETE_FAMILY_DETAILS_START,);
        yield call(onDeleteFamilyDetailsStartAsync, userId);
    }
}
// updating data

export function* onUpdateFamilyDetailsStartAsync (payload){
    let id = payload.payload[0].id;

    const payloadData = payload.payload[0].values;

try {
    const response = yield call(updateFamilyDetailsApi,id,payloadData);
    if (response.status === 201) {

        yield put(updateFamilyDetailsSuccess(response.data));

    }
} catch (error) {
    yield put(updateFamilyDetailsError(error.response.data));
    
}
}

export function* onUpdateFamilyDetails(){
    yield takeLatest(types.UPDATE_FAMILY_DETAILS_START,onUpdateFamilyDetailsStartAsync);
}

    
 

