import {call,put,delay,takeEvery} from 'redux-saga/effects';
import { 
    loadUsersSuccess,
    loadUsersError,
} from '../actions/UserActions';
import * as types from '../actions/actionTypes';
import { getUserApi} from '../apis/userApi';

export function* onLoadUsersStartAsync (){
    try {
        const response = yield call(getUserApi);
        if (response.status === 200) {
            yield delay(500);
            yield put(loadUsersSuccess(response.data));
        }
    } catch (error) {
        yield put(loadUsersError(error.response.data));
    }
}
export function* onLoadUsers(){
    yield takeEvery(types.LOAD_USERS_START,onLoadUsersStartAsync);
}


    
 

