import axios from "axios";
import {
	FETCHING_COMPANY,
    COMPANY_FETCH_SUCCESS,
    COMPANY_FETCH_FAIL,
    VULNERABILITIES,
    ADDING_VUL,
    SWITCHING_STATUS,
    EDITING_SCORE
	
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

const vulSuccess = (data) => {
    return {
        type: VULNERABILITIES,
        payload: data
    }
}

export const fetchVulnerabilities = (data) => {
    return (dispatch) => {
    console.log('dataaaaaaaa', data)

        axios.post(`http://localhost:5001/api/admin-dashboard/get-vulnerabilities`, data)
        .then(response => {
            console.log("Vulnerability response = ", response);
            dispatch(vulSuccess(response.data.vulnerabilities))
        }).catch(error => {
            console.log("Error in fetching Vulnerability = ", error);
        })
    }
}

const addingVul=()=>{
    return{
        type: ADDING_VUL
    }
}

export const addVulnerability = (data) =>{
    return(dispatch)=>{
        dispatch(addingVul())
        axios.post(`http://localhost:5001/api/admin-dashboard/add-vulnerability`, data)
        .then(response=>{
            console.log("Added vul-----", response)
            dispatch(addingVul())
        }).catch(err=>{
            console.log("Error in adding vul-----", err)
            dispatch(addingVul())
        })
    }
}

const switchingStatus=(id)=>{
    return{
        type: SWITCHING_STATUS,
        payload: id
    }
}

export const switchStatus = (id, userId) =>{
    return(dispatch)=>{
        dispatch(switchingStatus(id))
        axios.post(`http://localhost:5001/api/admin-dashboard/switchstatus/${userId}/${id}`)
        .then(response=>{
            console.log("status switched-----", response)
            dispatch(switchingStatus(id))
        }).catch(err=>{
            console.log("Error in switcihng status-----", err)
            dispatch(switchingStatus(id))
        })
    }
}

const editingScore=()=>{
    return{
        type: EDITING_SCORE,
    }
}

export const editScore = (data) =>{
    return(dispatch)=>{
        dispatch(editingScore())
        axios.post(`http://localhost:5001/api/admin-dashboard/editscore`, data)
        .then(response=>{
            console.log("Score Edited-----", response)
            dispatch(editingScore())
        }).catch(err=>{
            console.log("Error in editing score-----", err)
            dispatch(editingScore())
        })
    }
}