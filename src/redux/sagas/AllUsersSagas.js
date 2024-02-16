import {call,put,takeEvery} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadAllUsersApi } from '../apis/allUsersApi';
import { loadAllUsersError, loadAllUsersSuccess } from '../actions/allUsersActions';
//getting data
export function* onLoadAllUsersStartAsync (){
        try {
            const response = yield call(loadAllUsersApi);
            if (response.status === 200) {
                yield put(loadAllUsersSuccess(response.data));
            }
        } catch (error) {
            yield put(loadAllUsersError(error.response.data)); 
        }
}
export function* onLoadAllUsersDetails(){
    yield takeEvery(types.LOAD_AllUSERS_DETAILS_START,onLoadAllUsersStartAsync);
}



    
 

