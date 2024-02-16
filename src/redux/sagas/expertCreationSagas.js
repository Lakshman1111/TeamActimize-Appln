import {call,put,takeLatest} from 'redux-saga/effects';

import { 
    createExpertCreationSuccess,
    createExpertCreationError,
    // loadBankDetailsSuccess, 
    // loadBankDetailsError,
} from '../actions/ExpertCreationActions';
import * as types from '../actions/actionTypes';
import {
    createExpertCreationApi,
    // loadBankDetailsApi,
} from '../apis/ExpertCreationApi';
//adding data
export function* onCreateExpertCreationStartAsync({ payload }) {
    try {
      const response = yield call(createExpertCreationApi, payload);
  
      console.log('API Response:', response); // Log the API response
  
      if (response.status === 200) {
        yield put(createExpertCreationSuccess(response));
      }
    } catch (error) {
      console.error('API Error:', error); // Log the API error
  
      yield put(createExpertCreationError(error.response));
    }
  }
  
  export function* onCreateExpertCreation() {
    yield takeLatest(types.CREATE_EXPERT_CREATION_START, onCreateExpertCreationStartAsync);
  }



    
 

