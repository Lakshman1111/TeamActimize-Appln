import {call,put,takeLatest} from 'redux-saga/effects';
import { 
    loginUserSuccess,
    loginUserError,
} from '../actions/LoginActions';
import * as types from '../actions/actionTypes';
import { loginUserApi} from '../apis/loginUserApi';
export function* onLoginUserStartAsync ({payload}){
        try {
            const result = yield call(loginUserApi,payload);
            const token = result.data.token;
            localStorage.setItem("token",token);
            if (result.status === 200) {
                window.location = '/'
                yield put(loginUserSuccess(result.data));
            }
        } catch (error) {
            yield put(loginUserError(error));
        }
}
export function* onLoginUser(){
    yield takeLatest(types.LOGIN_USER_START,onLoginUserStartAsync);
}



    
 

