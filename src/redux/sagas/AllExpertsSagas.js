import {call,put,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadAllExpertsError, loadAllExpertsStart, loadAllExpertsSuccess } from '../actions/allExpertsActions';
import { loadAllExpertsApi } from '../apis/AllExpertsApi';
//getting data
export function* onLoadAllExpertsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadAllExpertsApi,page);
            if (response.status === 200) {
                yield put(loadAllExpertsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadAllExpertsError(error.response.data));       
        }
}
export function* onLoadAllExpertsDetails(){
    yield takeEvery(types.LOAD_ALL_EXPERTS_START,onLoadAllExpertsStartAsync);
}



    
 

