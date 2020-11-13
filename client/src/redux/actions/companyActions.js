import axios from "axios";
import {
	FETCHING_COMPANY,
    COMPANY_FETCH_SUCCESS,
	COMPANY_FETCH_FAIL,
	
} from "./actionTypes";

const fetching = () => {
	return {
		type: FETCHING_COMPANY,
	};
};

const success = (user) => {
	return {
		type: COMPANY_FETCH_SUCCESS,
		payload: user,
	};
};

const fail = (err) => {
	console.log("Failed")
	return {
		type: COMPANY_FETCH_FAIL,
		payload: err.message,
	};
};

export const fetchCompany = (id) => {
    return(dispatch)=>{
    dispatch(fetching())
    axios
        .get(`http://localhost:5001/api/admin-dashboard/company-details/${id}`)
        .then((response) => {
            const user = response.data
            console.log('ACTION RAN---', user)
            dispatch(success(user));
        }).catch(err=>{
            console.log("errror in user profile", err)
            dispatch(fail(err));
        });
    }
}