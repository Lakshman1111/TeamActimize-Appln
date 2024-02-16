import {call,put,take,takeEvery,takeLatest} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { createReleavingDetailsApi, loadReleavingDetailsApi, updateReleavingDetailsApi } from '../apis/ExpertReleavingDetailsApi';
import { createReleavingDetailsError, createReleavingDetailsSuccess, loadReleavingDetailsError, loadReleavingDetailsSuccess, updateReleavingDetailsError, updateReleavingDetailsSuccess } from '../actions/ExpertReleavingDetailsActions';
import { loadBankWiseDetailsApi, loadEmergencyWiseDetailsApi, loadFamilyWiseDetailsApi, loadLeaveBankWiseDetailsApi, loadPersonalWiseDetailsApi, loadProjectsWiseDetailsApi, loadSkillsWiseDetailsApi, loadWorkExperienceWiseDetailsApi } from '../apis/expertPersonalWiseApi';
import { loadBankWiseDetailsError, loadBankWiseDetailsSuccess, loadEmergencyWiseDetailsError, loadEmergencyWiseDetailsSuccess, loadFamilyWiseDetailsError, loadFamilyWiseDetailsSuccess, loadLeaveBankWiseDetailsError, loadLeaveBankWiseDetailsSuccess, loadPersonalWiseDetailsError, loadPersonalWiseDetailsSuccess, loadProjectWiseDetailsError, loadProjectWiseDetailsSuccess, loadSkillsWiseDetailsError, loadSkillsWiseDetailsSuccess, loadWorkExperienceWiseDetailsError, loadWorkExperienceWiseDetailsSuccess } from '../actions/expertPersonalWiseActions';




export function* onLoadPersonalWiseDetailsStartAsync(action) {
    try {
        const response = yield call(loadPersonalWiseDetailsApi, action.payload); // Pass the ID from the action
        yield put(loadPersonalWiseDetailsSuccess(response)); // Ensure the response structure fits your expectations
    } catch (error) {
        yield put(loadPersonalWiseDetailsError(error)); // Capture the error directly
    }
}

export function* onLoadPersonalWiseDetails() {
    yield takeEvery(types.LOAD_PERSONALWISE_DETAILS_START, onLoadPersonalWiseDetailsStartAsync);
}

export function* onLoadEmergencyWiseDetailsStartAsync(action) {
    try {
        const response = yield call(loadEmergencyWiseDetailsApi, action.payload); // Pass the ID from the action
        yield put(loadEmergencyWiseDetailsSuccess(response)); // Ensure the response structure fits your expectations
    } catch (error) {
        yield put(loadEmergencyWiseDetailsError(error)); // Capture the error directly
    }
}

export function* onLoadEmergencyWiseDetails() {
    yield takeEvery(types.LOAD_EMERGENCYWISE_DETAILS_START, onLoadEmergencyWiseDetailsStartAsync);
}
 // family wise sagas   
export function* onLoadFamilyWiseDetailsStartAsync(action) {
    try {
        const response = yield call(loadFamilyWiseDetailsApi, action.payload); // Pass the ID from the action
        yield put(loadFamilyWiseDetailsSuccess(response)); // Ensure the response structure fits your expectations
    } catch (error) {
        yield put(loadFamilyWiseDetailsError(error)); // Capture the error directly
    }
}

export function* onLoadFamilyWiseDetails() {
    yield takeEvery(types.LOAD_FAMILYWISE_DETAILS_START, onLoadFamilyWiseDetailsStartAsync);
}

 // skill wise sagas   
 export function* onLoadskillWiseDetailsStartAsync(action) {
    try {
        const response = yield call(loadSkillsWiseDetailsApi, action.payload); // Pass the ID from the action
        yield put(loadSkillsWiseDetailsSuccess(response)); // Ensure the response structure fits your expectations
    } catch (error) {
        yield put(loadSkillsWiseDetailsError(error)); // Capture the error directly
    }
}

export function* onLoadSkillsWiseDetails() {
    yield takeEvery(types.LOAD_SKILLWISE_DETAILS_START, onLoadskillWiseDetailsStartAsync);
}

 // work experience wise sagas   
 export function* onLoadWorkExperienceWiseDetailsStartAsync(action) {
    try {
        const response = yield call(loadWorkExperienceWiseDetailsApi, action.payload); // Pass the ID from the action
        yield put(loadWorkExperienceWiseDetailsSuccess(response)); // Ensure the response structure fits your expectations
    } catch (error) {
        yield put(loadWorkExperienceWiseDetailsError(error)); // Capture the error directly
    }
}

export function* onLoadWorkExperienceWiseDetails() {
    yield takeEvery(types.LOAD_WORKEXPERIENCEWISE_DETAILS_START, onLoadWorkExperienceWiseDetailsStartAsync);
}

 // work  bank wise sagas   
 export function* onLoadbankWiseDetailsStartAsync(action) {
    try {
        const response = yield call(loadBankWiseDetailsApi, action.payload); // Pass the ID from the action
        yield put(loadBankWiseDetailsSuccess(response)); // Ensure the response structure fits your expectations
    } catch (error) {
        yield put(loadBankWiseDetailsError(error)); // Capture the error directly
    }
}

export function* onLoadBankWiseDetails() {
    yield takeEvery(types.LOAD_BANKWISE_DETAILS_START, onLoadbankWiseDetailsStartAsync);
}


 // work  project wise sagas   
 export function* onLoadprojectWiseDetailsStartAsync(action) {
    try {
        const response = yield call(loadProjectsWiseDetailsApi, action.payload); // Pass the ID from the action
        yield put(loadProjectWiseDetailsSuccess(response)); // Ensure the response structure fits your expectations
    } catch (error) {
        yield put(loadProjectWiseDetailsError(error)); // Capture the error directly
    }
}

export function* onLoadprojectWiseDetails() {
    yield takeEvery(types.LOAD_PROJECTSWISE_DETAILS_START, onLoadprojectWiseDetailsStartAsync);
}

 // work   leave bank wise sagas   
 export function* onLoadLeaveBankWiseDetailsStartAsync(action) {
    try {
        const response = yield call(loadLeaveBankWiseDetailsApi, action.payload); // Pass the ID from the action
        yield put(loadLeaveBankWiseDetailsSuccess(response)); // Ensure the response structure fits your expectations
    } catch (error) {
        yield put(loadLeaveBankWiseDetailsError(error)); // Capture the error directly
    }
}

export function* onLoadleavebankWiseDetails() {
    yield takeEvery(types.LOAD_LEAVEBANKWISE_DETAILS_START, onLoadLeaveBankWiseDetailsStartAsync);
}