import * as types from '../actions/actionTypes';

const initialState = {
    createCertificateDetails: {
        users: [],
        token: null,
        loading: false,
           },
};
const CertificateDetailsReducer = (state = initialState.createCertificateDetails, action)=>{
    switch (action.type) {
            case types.CREATE_CERTIFICATE_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            case types.CREATE_CERTIFICATE_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                };
            case types.CREATE_CERTIFICATE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                };
            case types.LOAD_CERTIFICATE_DETAILS_START:
                return {
                    ...state,
                    loading: true
                };
            
            case types.LOAD_CERTIFICATE_DETAILS_SUCCESS:
                return {
                    ...state,
                    loading: false ,
                    data:action.payload
                    };
            case types.LOAD_CERTIFICATE_DETAILS_ERROR:
                return {
                    ...state,
                    loading: false ,
                    error:action.payload
                    };
        case types.UPDATE_CERTIFICATE_DETAILS_START:
            return {
                ...state,
                loading: true
            };
        case types.UPDATE_CERTIFICATE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false ,
            };
        case types.UPDATE_CERTIFICATE_DETAILS_ERROR:
            return {
                ...state,
                loading: false ,
                error:action.payload
            };        
    
            default:
            return state;
    }

}
export default CertificateDetailsReducer