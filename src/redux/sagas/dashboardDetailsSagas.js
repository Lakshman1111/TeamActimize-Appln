import { call, put, delay, takeEvery } from 'redux-saga/effects';
import {
    loadDashboardDetailsSuccess,
    loadDashboardDetailsError,
} from '../actions/dashboardDetailsActions';
import * as types from '../actions/actionTypes';
import { getDashboardDetailsApi } from '../apis/dashboardDetailsApi';

export function* onLoadDashboardDetailsStartAsync() {
    try {
        const response = yield call(getDashboardDetailsApi);
        if (response.status === 200) {
            yield delay(500);
            yield put(loadDashboardDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadDashboardDetailsError(error.response.data));
    }
}
export function* onLoadDashboardDetials() {
    yield takeEvery(types.LOAD_DASHBOARD_DETAILS_START, onLoadDashboardDetailsStartAsync);
}





