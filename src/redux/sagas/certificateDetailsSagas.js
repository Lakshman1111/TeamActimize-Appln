import {call,put,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createCertificateDetailsApi, loadCertificateDetailsApi, updateCertificateDetailsApi } from '../apis/ExpertCertificateApi';
import { createCertificateDetailsError, createCertificateDetailsSuccess, loadCertificateDetailsError, loadCertificateDetailsSuccess, updateCertificateDetailsError, updateCertificateDetailsSuccess } from '../actions/expertCertificateActions';
export function* onCreateCertificateDetailsStartAsync ({payload}){
        try {
            const response = yield call(createCertificateDetailsApi,payload);
            if (response.status === 201) {
                yield put(createCertificateDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createCertificateDetailsError(error.response.data));
            
        }
}
export function* onCreateCertificateDetails(){
    yield takeLatest(types.CREATE_CERTIFICATE_DETAILS_START,onCreateCertificateDetailsStartAsync);
}
//getting data
export function* onLoadCertificateDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadCertificateDetailsApi,page);
            if (response.status === 200) {
                yield put(loadCertificateDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadCertificateDetailsError(error.response.data)); 
        }
}
export function* onLoadCertificateDetails(){
    yield takeEvery(types.LOAD_CERTIFICATE_DETAILS_START,onLoadCertificateDetailsStartAsync);
}
export function* onUpdateCertificateDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;

try {
    const response = yield call(updateCertificateDetailsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateCertificateDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateCertificateDetailsError(error.response.data));
}
}
export function* onUpdateCertificateDetails(){
    yield takeLatest(types.UPDATE_CERTIFICATE_DETAILS_START,onUpdateCertificateDetailsStartAsync);
}


    
 

