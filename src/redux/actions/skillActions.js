import * as types from './actionTypes';
//adding skill details
export const createSkillDetailsStart =  (users) =>({
    type:types.CREATE_SKILLS_DETAILS_START,
    payload: users,
});
export const createSkillDetailsSuccess =  () =>({
    type:types.CREATE_SKILLS_DETAILS_SUCCESS,
});
export const createSkillDetailsError = (error) =>({
    type:types.CREATE_SKILLS_DETAILS_ERROR,
    payload: error,
});
//loading skill details
export const loadSkillDetailsStart = (pageno) =>({
    type:types.LOAD_SKILLS_DETAILS_START,
    payload:{page : pageno },
});

export const loadSkillDetailsSuccess = (data) =>(
    {
    type:types.LOAD_SKILLS_DETAILS_SUCCESS,
    payload: data,
});

export const loadSkillDetailsError = (error) =>({
    type:types.LOAD_SKILLS_DETAILS_ERROR,
    payload: error,
});
//deleting skilldetails
export const deleteSkillDetailsStart = (userId) =>(
    {
    type:types.DELETE_SKILLS_DETAILS_START,
    payload: userId,
});

export const deleteSkillDetailsSuccess = (userId) =>({
    type:types.DELETE_SKILLS_DETAILS_SUCCESS,
    payload: userId,
});

export const deleteSkillDetailsError = (error) =>({
    type:types.DELETE_SKILLS_DETAILS_ERROR,
    payload: error,
});
//updating existing user details
export const updateSkillDetailsStart = (id,userInfo) =>({
    type:types.UPDATE_SKILLS_DETAILS_START,
    payload: [id,userInfo],
});
export const updateSkillDetailsSuccess = () =>({
    type:types.UPDATE_SKILLS_DETAILS_SUCCESS,
});
export const updateSkillDetailsError = (error) =>({
    type:types.UPDATE_SKILLS_DETAILS_ERROR,
    payload: error,
});
export default {
    createSkillDetailsStart,
    loadSkillDetailsStart,
    deleteSkillDetailsStart,
    updateSkillDetailsStart,
}
