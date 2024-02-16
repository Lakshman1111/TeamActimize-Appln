import {call,put,delay,takeEvery} from 'redux-saga/effects';
import { 
    loadUsersListSuccess,
    loadUsersListError,
} from '../actions/usersListActions';
import * as types from '../actions/actionTypes';
import { usersListApi} from '../apis/usersListApi';
export function* onLoadUsersListStartAsync (){
    try {
        const response = yield call(usersListApi);
        if (response.status === 200) {
            yield delay(500);
            yield put(loadUsersListSuccess(response.data));
        }
    } catch (error) {
        yield put(loadUsersListError(error.response.data));
    }
}
export function* onLoadUsersList(){
    yield takeEvery(types.LOAD_USERS_START,onLoadUsersListStartAsync);
}





    
 

