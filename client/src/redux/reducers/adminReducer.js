import {
    LOGINSIGNUP,
    SUCCESS,
    FAIL,
    LOGOUT,

} from "../actions/actionTypes";

const adminReducer = (state = {loading:"", success:"", error:""}, action) => {
	switch (action.type) {
		case LOGINSIGNUP:
			return { ...state, loading: true };
		case SUCCESS:
            return { ...state, success: action.payload, loading: false, error:"" };
        case FAIL:
            return { ...state, error: action.payload, loading: false, success:"" };
        case LOGOUT:
            return {...state};
        default:
            return state;
	}
};

export default adminReducer