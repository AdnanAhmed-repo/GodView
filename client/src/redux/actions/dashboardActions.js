import axios from "axios";
import {
	FETCHING,
    FETCH_SUCCESS,
	FETCH_FAIL,
	
} from "./actionTypes";

const fetching = () => {
	return {
		type: FETCHING,
	};
};

const success = (user) => {
	console.log("Success")
	localStorage.setItem('user', JSON.stringify(user))
	const userData = JSON.parse(localStorage.getItem('user'))
	return {
		type: FETCH_SUCCESS,
		payload: userData,
	};
};

const fail = (err) => {
	console.log("Failed")
	return {
		type: FETCH_FAIL,
		payload: err.message,
	};
};



export const fetchUsers = () => {
	
	return (dispatch) => {
		dispatch(fetching())
		axios
			.get(`http://localhost:5001/api/admin-dashboard`)
			.then((response) => {
                const users = response.data;
				dispatch(success(users));
			})
			.catch((err) => {
                dispatch(fail(err))
				console.log("ERROR IN FETCHING USERS NEW____", err);
			});
	};
};

