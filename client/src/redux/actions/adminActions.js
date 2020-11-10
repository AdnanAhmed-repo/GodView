import axios from "axios";
import {
	LOGINSIGNUP,
    SUCCESS,
	FAIL,
	LOGOUT
	
} from "./actionTypes";

export const loginSignup = () => {
	return {
		type: LOGINSIGNUP,
	};
};

export const success = (user) => {
	console.log("Success")
	localStorage.setItem('user', JSON.stringify(user))
	const userData = JSON.parse(localStorage.getItem('user'))
	return {
		type: SUCCESS,
		payload: userData,
	};
};

export const fail = (err) => {
	console.log("Failed")
	return {
		type: FAIL,
		payload: err.message,
	};
};



export const loginAdmin = (dataToSubmit) => {
	
	return (dispatch) => {
		dispatch(loginSignup())
		axios
			.post(`http://localhost:5001/api/admin/login`, dataToSubmit)
			.then((response) => {
				const user = response.data;
				dispatch(success(user));
			})
			.catch((err) => {
                dispatch(fail(err))
				console.log("ERROR IN LOGIN ACTION NEW____", err);
			});
	};
};

export const signupAdmin = (dataToSubmit) => {
	return (dispatch) => {
		dispatch(loginSignup())
		axios
			.post(`http://localhost:5001/api/admin/register`, dataToSubmit)
			.then((response) => {
				const user = response.data;
				dispatch(success(user));
			})
			.catch((err) => {
                dispatch(fail(err))
				console.log("ERROR IN REGISTER ACTION NEW____", err);
			});
	};
};

export const logoutAdmin = () => {
	return {
		type: LOGOUT
	};
};