import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createReleavingDetailsApi, loadReleavingDetailsApi, updateReleavingDetailsApi } from '../apis/ExpertReleavingDetailsApi';
import { createReleavingDetailsError, createReleavingDetailsSuccess, loadReleavingDetailsError, loadReleavingDetailsSuccess, updateReleavingDetailsError, updateReleavingDetailsSuccess } from '../actions/ExpertReleavingDetailsActions';
import { loadProficiencyDetailsApi, loadProficiencySelectDetailsApi } from '../apis/expertProficiencyDetailsApi';
import { loadProficiencyDetailsError, loadProficiencyDetailsSuccess, loadProficiencySelectDetailsError, loadProficiencySelectDetailsStart, loadProficiencySelectDetailsSuccess } from '../actions/expertProficiencyActions';
import { loadWeeklyDetailsApi, loadWeeklySelectDetailsApi } from '../apis/expertWeeklyDetailsApi';
import { loadWeeklyDetailsError, loadWeeklyDetailsSuccess, loadWeeklySelectDetailsError, loadWeeklySelectDetailsSuccess } from '../actions/expertWeeklyActions';

//getting data
export function* onLoadWeeklyDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadWeeklyDetailsApi,page);
            if (response.status === 200) {
                yield put(loadWeeklyDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadWeeklyDetailsError(error.response.data)); 
        }
}

export function* onLoadWeeklyDetails(){
    yield takeEvery(types.LOAD_WEEKLY_DETAILS_START,onLoadWeeklyDetailsStartAsync);
}



export function* onLoadWeeklySelectDetailsStartAsync (action){
    try {
        const { name,start_date } = action.payload;;
        const response = yield call(loadWeeklySelectDetailsApi ,name,start_date);
        if (response.status === 200) {
            yield put(loadWeeklySelectDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadWeeklySelectDetailsError(error.response.data)); 
    }
}

export function* onLoadWeeklySelectDetails(){
yield takeEvery(types.LOAD_WEEKLYSELECT_DETAILS_START,onLoadWeeklySelectDetailsStartAsync);
}
