import {
    FETCHING_COMPANY,
    COMPANY_FETCH_SUCCESS,
    COMPANY_FETCH_FAIL,
    VULNERABILITIES,
    ADDING_VUL,
    SWITCHING_STATUS,
    EDITING_SCORE

} from "../actions/actionTypes";

const companyReducer = (state = {loading:"", success:"", error:"", vulnerabilities:"", isAdding: false, isSwitching: {status:false, id:""}, isEditing:false}, action) => {
	switch (action.type) {
		case FETCHING_COMPANY:
            console.log('wait loadingggg....')
			return { ...state, loading: true };
		case COMPANY_FETCH_SUCCESS:
            return { ...state, success: action.payload, loading: false, error:"" };
        case COMPANY_FETCH_FAIL:
            console.log("FAAAAAAAAAAILED", action.payload)
            return { ...state, error: action.payload, loading: false, success:"" };
        case VULNERABILITIES:
            return {...state, vulnerabilities: action.payload }
        case ADDING_VUL:
            return {...state, isAdding: !state.isAdding }
        case SWITCHING_STATUS:
            return {...state, isSwitching: {...state.isSwitching, status: !state.isSwitching.status, id:action.payload}}
        case EDITING_SCORE:
            return {...state, isEditing: !state.isEditing}   
        default:
            return state;
	}
};

export default companyReducer