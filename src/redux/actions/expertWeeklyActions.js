import * as types from './actionTypes';
//loading Proficiency details
export const loadWeeklyDetailsStart = (pageno) =>{
    return {
        type:types.LOAD_WEEKLY_DETAILS_START,
        payload:{page : pageno },
    }
};
export const loadWeeklyDetailsSuccess = (data) =>(
    {
    type:types.LOAD_WEEKLY_DETAILS_SUCCESS,
    payload: data,
});
export const loadWeeklyDetailsError = (error) =>({
    type:types.LOAD_WEEKLY_DETAILS_ERROR,
    payload: error,
});

export const loadWeeklySelectDetailsStart = (username,weekdate) => {
    return {
        type: types.LOAD_WEEKLYSELECT_DETAILS_START,
        payload:{name:username ,start_date:weekdate},
    };
};
// loading Weekly Select  details
export const loadWeeklySelectDetailsSuccess = (data) =>(
    {
    type:types.LOAD_WEEKLYSELECT_DETAILS_SUCCESS,
    payload: data,
});
export const loadWeeklySelectDetailsError = (error) =>({
    type:types.LOAD_WEEKLYSELECT_DETAILS_ERROR,
    payload: error,
});
export default {
    loadWeeklyDetailsStart,
    loadWeeklySelectDetailsStart
}
