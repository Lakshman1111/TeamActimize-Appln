import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { 
    createWorkExperienceDetailsSuccess,
    createWorkExperienceDetailsError,
    loadWorkExperienceDetailsSuccess,
    loadWorkExperienceDetailsError,
    updateWorkExperienceDetailsSuccess,
    updateWorkExperienceDetailsError,
    deleteWorkExperienceDetailsSuccess,
    deleteWorkExperienceDetailsError,
} from '../actions/workExperienceActions';
import {
    createWorkExpDetailsApi,
    loadWorkExpDetailsApi,
    deleteWorkExpDetailsApi,
    updateWorkExpDetailsApi
} from '../apis/workExperienceApi';
//adding data
export function* onCreateWorkExperienceDetailsStartAsync ({payload}){
        try {
            const response = yield call(createWorkExpDetailsApi,payload);
            if (response.status === 201) {
                yield put(createWorkExperienceDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createWorkExperienceDetailsError(error.response.data));
        }
}
export function* onCreateWorkExperienceDetails(){
    yield takeLatest(types.CREATE_WORKEXP_DETAILS_START,onCreateWorkExperienceDetailsStartAsync);
}

//getting data
export function* onLoadWorkExperienceDetailsStartAsync (){
        try {
            const response = yield call(loadWorkExpDetailsApi);
            if (response.status === 200) {
                yield put(loadWorkExperienceDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadWorkExperienceDetailsError(error.response.data)); 
        }
}

export function* onLoadWorkExperienceDetails(){
    yield takeEvery(types.LOAD_WORKEXP_DETAILS_START,onLoadWorkExperienceDetailsStartAsync);
}
//deleting data
export function* onDeleteWorkExperienceDetailsStartAsync (userId){
        try {
            const response = yield call(deleteWorkExpDetailsApi,userId);
            if (response.status === 201) {
                yield put(deleteWorkExperienceDetailsSuccess(userId));
            }
        } catch (error) {
            yield put(deleteWorkExperienceDetailsError(error.response))
        }
}

export function* onDeleteWorkExperienceDetails(){
    while (true) {
        const {payload : userId} =  yield take(types.DELETE_WORKEXP_DETAILS_START,);
        yield call(onDeleteWorkExperienceDetailsStartAsync, userId);
    }
}
// updating data

export function* onUpdateWorkExperienceDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;

try {
    const response = yield call(updateWorkExpDetailsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateWorkExperienceDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateWorkExperienceDetailsError(error.response.data));
}
}
export function* onUpdateWorkExperienceDetails(){
    yield takeLatest(types.UPDATE_WORKEXP_DETAILS_START,onUpdateWorkExperienceDetailsStartAsync);
}


    
 

