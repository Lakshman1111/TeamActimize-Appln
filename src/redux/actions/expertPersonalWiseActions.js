import * as types from './actionTypes';
//adding work experience details
export const loadPersonalWiseDetailsStart = (id) =>({
    type:types.LOAD_PERSONALWISE_DETAILS_START,
    payload: id,
});
export const loadPersonalWiseDetailsSuccess = (data) =>(
    {
    type:types.LOAD_PERSONALWISE_DETAILS_SUCCESS,
    payload: data,
});
export const loadPersonalWiseDetailsError = (error) =>({
    type:types.LOAD_PERSONALWISE_DETAILS_ERROR,
    payload: error,
});
// LOAD EMERGENCYWISE DETAILS
export const loadEmergencyWiseDetailsStart = (id) =>({
    type:types.LOAD_EMERGENCYWISE_DETAILS_START,
    payload: id,
});
export const loadEmergencyWiseDetailsSuccess = (data) =>(
    {
    type:types.LOAD_EMERGENCYWISE_DETAILS_SUCCESS,
    payload: data,
});
export const loadEmergencyWiseDetailsError = (error) =>({
    type:types.LOAD_EMERGENCYWISE_DETAILS_ERROR,
    payload: error,
});
// LOAD EMERGENCYWISE DETAILS
export const loadFamilyWiseDetailsStart = (id) =>({ 
    type:types.LOAD_FAMILYWISE_DETAILS_START,
    payload: id,
});
export const loadFamilyWiseDetailsSuccess = (data) =>(
    {
    type:types.LOAD_FAMILYWISE_DETAILS_SUCCESS,
    payload: data,
});

export const loadFamilyWiseDetailsError = (error) =>({
    type:types.LOAD_FAMILYWISE_DETAILS_ERROR,
    payload: error,
});
// LOAD SKILL WISE  DETAILS
export const loadSkillsWiseDetailsStart = (id) =>({
    
    type:types.LOAD_SKILLWISE_DETAILS_START,
    payload: id,
});
export const loadSkillsWiseDetailsSuccess = (data) =>(
    {
    type:types.LOAD_SKILLWISE_DETAILS_SUCCESS,
    payload: data,
});

export const loadSkillsWiseDetailsError = (error) =>({
    type:types.LOAD_SKILLWISE_DETAILS_ERROR,
    payload: error,
});

// LOAD WORK EXPERIENCE WISE  DETAILS
export const loadWorkExperienceWiseDetailsStart = (id) =>({
    type:types.LOAD_WORKEXPERIENCEWISE_DETAILS_START,
    payload: id,
});
export const loadWorkExperienceWiseDetailsSuccess = (data) =>(
    {
    type:types.LOAD_WORKEXPERIENCEWISE_DETAILS_SUCCESS,
    payload: data,
});

export const loadWorkExperienceWiseDetailsError = (error) =>({
    type:types.LOAD_WORKEXPERIENCEWISE_DETAILS_ERROR,
    payload: error,
});

// LOAD BANK WISE  DETAILS
export const loadBankWiseDetailsStart = (id) =>({
    type:types.LOAD_BANKWISE_DETAILS_START,
    payload: id,
});

export const loadBankWiseDetailsSuccess = (data) =>(
    {
    type:types.LOAD_BANKWISE_DETAILS_SUCCESS,
    payload: data,
});

export const loadBankWiseDetailsError = (error) =>({
    type:types.LOAD_BANKWISE_DETAILS_ERROR,
    payload: error,
});
// LOAD PROJECT WISE  DETAILS
export const loadProjectWiseDetailsStart = (id) =>({
    type:types.LOAD_PROJECTSWISE_DETAILS_START,
    payload: id,
});

export const loadProjectWiseDetailsSuccess = (data) =>(
    {
    type:types.LOAD_PROJECTSWISE_DETAILS_SUCCESS,
    payload: data,
});

export const loadProjectWiseDetailsError = (error) =>({
    type:types.LOAD_PROJECTSWISE_DETAILS_ERROR,
    payload: error,
});

// LOAD LEAVE BANK WISE  DETAILS
export const loadLeaveBankWiseDetailsStart = (id) =>({
    type:types.LOAD_LEAVEBANKWISE_DETAILS_START,
    payload: id,
});
export const  loadLeaveBankWiseDetailsSuccess = (data) =>(
    {
    type:types.LOAD_LEAVEBANKWISE_DETAILS_SUCCESS,
    payload: data,
});
export const  loadLeaveBankWiseDetailsError = (error) =>({
    type:types.LOAD_LEAVEBANKWISE_DETAILS_ERROR,
    payload: error,
});