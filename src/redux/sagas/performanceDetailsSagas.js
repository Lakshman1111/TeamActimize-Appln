import {call,put,takeEvery,take,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createPerformanceDetailsApi, loadPerformanceDetailsApi, updatePerformanceDetailsApi } from '../apis/performanceDetailsApi';
import { createPerformanceDetailsError, createPerformanceDetailsStart,loadPerformanceDetailsSuccess,loadPerformanceDetailsError,updatePerformanceDetailsError ,updatePerformanceDetailsSuccess} from '../actions/ExpertPerformanceActions';
//adding data
export function* onCreatePerformanceDetailsStartAsync({ payload }) {
    try {
      const response = yield call(createPerformanceDetailsApi, payload);
      if (response.status === 200) {
        yield put(createPerformanceDetailsStart(response));
      }
    } catch (error) {
      console.error('API Error:', error); // Log the API error
      yield put(createPerformanceDetailsError(error.response));
    }
  }
  export function* onCreatePerformanceDetails() {
    yield takeLatest(types.CREATE_PERFORMANCE_DETAILS_START, onCreatePerformanceDetailsStartAsync);
  }
//getting data
export function* onLoadPerformanceDetailsStartAsync (action){
  
        try {
          const {page} = action.payload;
            const response = yield call(loadPerformanceDetailsApi,page);
            if (response.status === 200) {
                yield put(loadPerformanceDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadPerformanceDetailsError(error.response.data));   
        }
}
export function* onLoadPerformanceDetails(){
    yield takeEvery(types.LOAD_PERFORMANCE_DETAILS_START,onLoadPerformanceDetailsStartAsync);
}
// updating data
export function* onUpdatePerformanceDetailsStartAsync (payload){
  let id = payload.payload[0].id;
  const payloadData = payload.payload[0];
try {
  const response = yield call(updatePerformanceDetailsApi,id,payloadData);
  if (response.status === 200) {
      yield put(updatePerformanceDetailsSuccess(response.data));
  }
} catch (error) {
  yield put(updatePerformanceDetailsError(error.response.data));
  
}
}

export function* onUpdatePerformanceDetails(){
  yield takeLatest(types.UPDATE_PERFORMANCE_DETAILS_START,onUpdatePerformanceDetailsStartAsync);
}



    
 

