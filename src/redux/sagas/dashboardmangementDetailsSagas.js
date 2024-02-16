import { call, put, delay, takeEvery } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadDashboardMangementDetailsError, loadDashboardMangementDetailsSuccess } from '../actions/dashboardMangementActions';
import { getDashboardMangementDetailsApi } from '../apis/dashboardMangementDetailsApi';

export function* onLoadDashboardMangementDetailsStartAsync() {
    try {
        const response = yield call(getDashboardMangementDetailsApi);
        if (response.status === 200) {
            yield delay(500);
            yield put(loadDashboardMangementDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadDashboardMangementDetailsError(error.response.data));
    }
}
export function* onLoadDashboardMangementDetials() {
    yield takeEvery(types.LOAD_DASHBOARDMANGEMENT_DETAILS_START, onLoadDashboardMangementDetailsStartAsync);
}

