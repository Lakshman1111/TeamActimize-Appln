import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createPaySlipDetailsApi } from '../apis/expertPaySlipApi';
import { createPayslipDetailsError, createPayslipDetailsSuccess } from '../actions/expertPayslipsActions';

export function* onCreatePaySlipDetailsStartAsync ({payload}){
        try {
            const response = yield call(createPaySlipDetailsApi,payload);
            if (response.status === 201) {
                yield put(createPayslipDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(createPayslipDetailsError(error.response.data));
            
        }
}

export function* onCreatePaySlipDetails(){
    yield takeLatest(types.CREATE_PAYSLIP_DETAILS_START,onCreatePaySlipDetailsStartAsync);
}



    
 

