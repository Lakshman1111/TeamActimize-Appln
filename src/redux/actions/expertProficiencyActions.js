import * as types from './actionTypes';
export const loadProficiencyDetailsStart = (pageno) =>({
    type:types.LOAD_PROFICIENCY_DETAILS_START,
    payload:{page : pageno },
});
export const loadProficiencyDetailsSuccess = (data) =>(
    {
    type:types.LOAD_PROFICIENCY_DETAILS_SUCCESS,
    payload: data,
});
export const loadProficiencyDetailsError = (error) =>({
    type:types.LOAD_PROFICIENCY_DETAILS_ERROR,
    payload: error,
}); 
//loading Proficiency details
export const loadProficiencySelectDetailsStart = (skillName,pageno) => {
    return {
        type: types.LOAD_PROFICIENCYSELECT_DETAILS_START,
        payload: { skill_name: skillName,page : pageno  },
    };
};
export const loadProficiencySelectDetailsSuccess = (data) => {
    return {
        type: types.LOAD_PROFICIENCYSELECT_DETAILS_SUCCESS,
        payload: data,
    };
};
export const loadProficiencySelectDetailsError = (error) => {
    return {
        type: types.LOAD_PROFICIENCYSELECT_DETAILS_ERROR,
        payload: error,
    };
};
export default {
    loadProficiencyDetailsStart,
    loadProficiencySelectDetailsStart
}
