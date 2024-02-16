import {call,put,takeEvery} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadBirthdayDetailsError, loadBirthdayDetailsSuccess } from '../actions/expertBirthdayActions';
import { loadBirthdayDetailsApi } from '../apis/ExpertBirthdayDetailsApi';
//getting data
export function* onLoadBirthdayDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadBirthdayDetailsApi,page);
            if (response.status === 200) {
                yield put(loadBirthdayDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadBirthdayDetailsError(error.response.data)); 
        }
}
export function* onLoadBirthdayDetails(){
    yield takeEvery(types.LOAD_BIRTHDAY_DETAILS_START,onLoadBirthdayDetailsStartAsync);
}





    
 

