import {
    FETCHING_COMPANY,
    COMPANY_FETCH_SUCCESS,
    COMPANY_FETCH_FAIL,

} from "../actions/actionTypes";

const companyReducer = (state = {loading:"", success:"", error:""}, action) => {
	switch (action.type) {
		case FETCHING_COMPANY:
            console.log('wait loadingggg....')
			return { ...state, loading: true };
		case COMPANY_FETCH_SUCCESS:
            return { ...state, success: action.payload, loading: false, error:"" };
        case COMPANY_FETCH_FAIL:
            console.log("FAAAAAAAAAAILED", action.payload)
            return { ...state, error: action.payload, loading: false, success:"" };

        default:
            return state;
	}
};

export default companyReducer