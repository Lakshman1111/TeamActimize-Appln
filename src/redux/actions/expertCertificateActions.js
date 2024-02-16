import * as types from './actionTypes';
//adding work experience details
export const createCertificateDetailsStart =  (users) =>({
    type:types.CREATE_CERTIFICATE_DETAILS_START,
    payload: users,
});
export const createCertificateDetailsSuccess =  () =>({
    type:types.CREATE_CERTIFICATE_DETAILS_SUCCESS,
});
export const createCertificateDetailsError = (error) =>({
    type:types.CREATE_CERTIFICATE_DETAILS_ERROR,
    payload: error,
});

//loading work experience details
export const loadCertificateDetailsStart = (pageno) =>({
    type:types.LOAD_CERTIFICATE_DETAILS_START,
    payload:{page : pageno },
});

export const loadCertificateDetailsSuccess = (data) =>(
    {
    type:types.LOAD_CERTIFICATE_DETAILS_SUCCESS,
    payload: data,
});
export const loadCertificateDetailsError = (error) =>({
    type:types.LOAD_RELEAVING_DETAILS_ERROR,
    payload: error,
});
// //updating existing user details
export const updateCertificateDetailsStart = (id,userInfo) =>({
    type:types.UPDATE_CERTIFICATE_DETAILS_START,
    payload: [id,userInfo],
});

export const  updateCertificateDetailsSuccess = () =>({
    type:types.UPDATE_CERTIFICATE_DETAILS_SUCCESS,  
});
export const  updateCertificateDetailsError = (error) =>({
    type:types.UPDATE_CERTIFICATE_DETAILS_ERROR,
    payload: error,
});
export default {
    createCertificateDetailsStart,
    loadCertificateDetailsStart,
    updateCertificateDetailsStart,
}
