import {call,put,takeEvery,take,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createLeaveBankError, createLeaveBankSuccess,loadLeaveBankSuccess,loadLeaveBankError, updateLeaveBankSuccess, updateLeaveBankError ,deleteLeaveBankSuccess,deleteLeaveBankError } from '../actions/leaveBankActions';
import { createLeaveBankApi, deleteLeaveBankApi, loadLeaveBankApi, updateLeaveBankApi } from '../apis/LeavebankApi';
//adding data
export function* onCreateLeaveBankStartAsync({ payload }) {
    try {
      const response = yield call(createLeaveBankApi, payload);
  
      console.log('API Response:', response); // Log the API response
  
      if (response.status === 200) {
        yield put(createLeaveBankSuccess(response));
      }
    } catch (error) {
      console.error('API Error:', error); // Log the API error
  
      yield put(createLeaveBankError(error.response));
    }
  }
  export function* onCreateLeaveBank() {
    yield takeLatest(types.CREATE_LEAVE_BANK_START, onCreateLeaveBankStartAsync);
  }
//getting data
export function* onLoadLeaveBankStartAsync (action){
        try {
          const {page} = action.payload;
            const response = yield call(loadLeaveBankApi,page);
            if (response.status === 200) {
                yield put(loadLeaveBankSuccess(response.data));
            }
        } catch (error) {
            yield put(loadLeaveBankError(error.response.data));
            
        }
}
export function* onLoadLeaveBank(){
    yield takeEvery(types.LOAD_LEAVE_BANK_START,onLoadLeaveBankStartAsync);
}
// updating data
export function* onUpdateLeaveBankStartAsync (payload){
  let id = payload.payload[0].id;
  const payloadData = payload.payload[0];

try {
  const response = yield call(updateLeaveBankApi,id,payloadData);
  if (response.status === 200) {
      yield put(updateLeaveBankSuccess(response.data));
  }
} catch (error) {
  yield put(updateLeaveBankError(error.response.data));
  
}
}
export function* onUpdateLeaveBank(){
  yield takeLatest(types.UPDATE_LEAVE_BANK_START,onUpdateLeaveBankStartAsync);
}
//deleting data
export function* onDeleteLeaveBankStartAsync (userId){
  try {
      const response = yield call(deleteLeaveBankApi,userId);
      if (response.status === 201) {
          yield put(deleteLeaveBankSuccess(userId));
      }
  } catch (error) {
      yield put(deleteLeaveBankError(error.response));
      
  }
}
export function* onDeleteLeaveBank(){
while (true) {
  const {payload : userId} =  yield take(types.DELETE_LEAVE_BANK_START,);
  yield call(onDeleteLeaveBankStartAsync, userId);
}
}
