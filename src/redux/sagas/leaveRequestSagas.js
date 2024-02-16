import {call,put,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadLeaveRequestDetailsApi, updateLeaveRequestDetailsApi } from '../apis/ExpertLeaveRequestApi';
import { loadLeaveRequestsDetailsError, loadLeaveRequestsDetailsSuccess, updateLeaveRequestsDetailsError, updateLeaveRequestsDetailsSuccess } from '../actions/ExpertLeaveRequestsActions';
//getting data
export function* onLoadLeaveRequestDetailsStartAsync (action){
        try {
          const {page} = action.payload;
            const response = yield call(loadLeaveRequestDetailsApi,page);
            if (response.status === 200) {
                yield put(loadLeaveRequestsDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadLeaveRequestsDetailsError(error.response.data)); 
        }
}
export function* onLoadLeaveRequestDetails(){
    yield takeEvery(types.LOAD_LEAVEREQUESTS_DETAILS_START,onLoadLeaveRequestDetailsStartAsync);
}
export function* onUpdateLeaveRequestDetailsStartAsync(payload) {
    try {
      const id = payload.payload[0];
      const payloadData = payload.payload[1];
      const response = yield call(updateLeaveRequestDetailsApi, id, payloadData);
      if (response.status === 200) {
        yield put(updateLeaveRequestsDetailsSuccess(response.data));
      }
    } catch (error) {
      yield put(updateLeaveRequestsDetailsError(error.response.data));
    }
  }  
  export function* onUpdateLeaveRequestsDetails() {
    yield takeLatest(types.UPDATE_LEAVEREQUESTS_DETAILS_START, onUpdateLeaveRequestDetailsStartAsync);
  }
  


    
 

