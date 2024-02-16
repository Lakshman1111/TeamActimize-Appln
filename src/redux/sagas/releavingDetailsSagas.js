import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createReleavingDetailsApi, loadReleavingDetailsApi, updateReleavingDetailsApi } from '../apis/ExpertReleavingDetailsApi';
import { createReleavingDetailsError, createReleavingDetailsSuccess, loadReleavingDetailsError, loadReleavingDetailsSuccess, updateReleavingDetailsError, updateReleavingDetailsSuccess } from '../actions/ExpertReleavingDetailsActions';
export function* onCreateReleavingDetailsStartAsync ({payload}){
        try {
            const response = yield call(createReleavingDetailsApi,payload);
            if (response.status === 201) {
                yield put(createReleavingDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createReleavingDetailsError(error.response.data));     
        }
}

export function* onCreateReleavingDetails(){
    yield takeLatest(types.CREATE_RELEAVING_DETAILS_START,onCreateReleavingDetailsStartAsync);
}
//getting data
export function* onLoadReleavingDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadReleavingDetailsApi,page);
            if (response.status === 200) {
                yield put(loadReleavingDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadReleavingDetailsError(error.response.data)); 
        }
}

export function* onLoadReleavingDetails(){
    yield takeEvery(types.LOAD_RELEAVING_DETAILS_START,onLoadReleavingDetailsStartAsync);
}
// updating data
export function* onUpdateReleavingDetailsStartAsync (payload){
    let id = payload.payload[0].id;
    const payloadData = payload.payload[0].values;
try {
    const response = yield call(updateReleavingDetailsApi,id,payloadData);
    if (response.status === 200) {
        yield put(updateReleavingDetailsSuccess(response.data));
    }
} catch (error) {
    yield put(updateReleavingDetailsError(error.response.data));
}
}
export function* onUpdateReleavingDetails(){
    yield takeLatest(types.UPDATE_RELEAVING_DETAILS_START,onUpdateReleavingDetailsStartAsync);
}


    
 

