import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createReleavingDetailsApi, loadReleavingDetailsApi, updateReleavingDetailsApi } from '../apis/ExpertReleavingDetailsApi';
import { createReleavingDetailsError, createReleavingDetailsSuccess, loadReleavingDetailsError, loadReleavingDetailsSuccess, updateReleavingDetailsError, updateReleavingDetailsSuccess } from '../actions/ExpertReleavingDetailsActions';
import { loadProficiencyDetailsApi, loadProficiencySelectDetailsApi } from '../apis/expertProficiencyDetailsApi';
import { loadProficiencyDetailsError, loadProficiencyDetailsSuccess, loadProficiencySelectDetailsError, loadProficiencySelectDetailsStart, loadProficiencySelectDetailsSuccess } from '../actions/expertProficiencyActions';
import { loadWeeklyDetailsApi, loadWeeklySelectDetailsApi } from '../apis/expertWeeklyDetailsApi';
import { loadWeeklyDetailsError, loadWeeklyDetailsSuccess, loadWeeklySelectDetailsError, loadWeeklySelectDetailsSuccess } from '../actions/expertWeeklyActions';
import { loadMonthlyDetailsApi } from '../apis/expertMonthlyDetailsApi';
import { loadMonthlyDetailsError, loadMonthlyDetailsSuccess } from '../actions/ExpertMonthlyActions';

//getting data
export function* onLoadMonthlyDetailsStartAsync (action){
        try {
            const { month } = action.payload;;
            const response = yield call(loadMonthlyDetailsApi,month);
            if (response.status === 200) {
                yield put(loadMonthlyDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadMonthlyDetailsError(error.response.data)); 
        }
}

export function* onLoadmonthlyDetails(){
    yield takeEvery(types.LOAD_MONTHLY_DETAILS_START,onLoadMonthlyDetailsStartAsync);
}

