import {call,put,takeEvery} from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loadProficiencyDetailsApi, loadProficiencySelectDetailsApi } from '../apis/expertProficiencyDetailsApi';
import { loadProficiencyDetailsError, loadProficiencyDetailsSuccess, loadProficiencySelectDetailsError, loadProficiencySelectDetailsSuccess } from '../actions/expertProficiencyActions';

//getting data
export function* onLoadProficiencyDetailsStartAsync (action){
        try {
            const {page} = action.payload;
            const response = yield call(loadProficiencyDetailsApi,page);
            if (response.status === 200) {
                yield put(loadProficiencyDetailsSuccess(response.data));
            }
        } catch (error) {
            yield put(loadProficiencyDetailsError(error.response.data)); 
        }
}

export function* onLoadProficiencyDetails(){
    yield takeEvery(types.LOAD_PROFICIENCY_DETAILS_START,onLoadProficiencyDetailsStartAsync);
}

export function* onLoadProficiencySelectDetailsStartAsync (action){
    try {
        const { skill_name } = action.payload;
        const {page} = action.payload;
        const response = yield call(loadProficiencySelectDetailsApi ,skill_name,page);
        if (response.status === 200) {
            yield put(loadProficiencySelectDetailsSuccess(response.data));
        }
    } catch (error) {
        yield put(loadProficiencySelectDetailsError(error.response.data)); 
    }
}

export function* onLoadProficiencySelectDetails(){
yield takeEvery(types.LOAD_PROFICIENCYSELECT_DETAILS_START,onLoadProficiencySelectDetailsStartAsync);
}





    
 

