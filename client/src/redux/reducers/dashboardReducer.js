import {
    FETCHING,
    FETCH_SUCCESS,
    FETCH_FAIL,

} from "../actions/actionTypes";

const dashboardReducer = (state = {fetching:"", success:"", error:""}, action) => {
	switch (action.type) {
		case FETCHING:
			return { ...state, fetching: true };
		case FETCH_SUCCESS:
            return { ...state, success: action.payload, fetching: false, error:"" };
        case FETCH_FAIL:
            return { ...state, error: action.payload, fetching: false, success:"" };

        default:
            return state;
	}
};

export default dashboardReducer