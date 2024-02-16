import {call,put,delay,takeEvery} from 'redux-saga/effects';
import { 
    loadCurrentWeekDetailsSuccess,
    loadCurrentWeekDetailsError,
} from '../actions/currentWeekActions';
import * as types from '../actions/actionTypes';
import { currentWeekApi,} from '../apis/currentWeekApi';
export function* onLoadCurrentWeekStartAsync (){
    try {
        const response = yield call(currentWeekApi);
        if (response.status === 200) {
           
            yield delay(500);
            yield put(loadCurrentWeekDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadCurrentWeekDetailsError(error.response.data));
        
    }
}
export function* onLoadCurrentWeek(){
    yield takeEvery(types.LOAD_CURRENT_WEEK_DETAILS_START,onLoadCurrentWeekStartAsync);
}





    
 

