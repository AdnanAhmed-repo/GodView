import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchCompany, fetchVulnerabilities, addVulnerability, switchStatus } from "../../redux/actions/companyActions";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./CompanyDetails.css";

const CompanyDetails = ({isAdding, isSwitching, ...props}) => {
	const [vulForm, setVulForm] = useState({
		vulName:"",
		vulDesc:"",
		vulType:""
	})

	useEffect(() => {
		let id = props.props.match.params.id;
		props.fetchCompany(id);
		props.fetchVulnerabilities({userId:id});

	}, [isAdding, isSwitching]);

	const handleVulForm=(e)=>{
		setVulForm({...vulForm, [e.target.name]: e.target.value})
	}

	const handleSubmit=()=>{
		let id = props.props.match.params.id;
		let data = {...vulForm, userId: id}
		setVulForm({...vulForm, vulName:"", vulDesc:"", vulType:""})
		props.addVulnerability(data)

	}

	const handleSwitch=(id)=>{
		console.log("==================",isSwitching)
		props.switchStatus(id)
	}

	return (
		<div className="company_details">
			{/* header */}
			
				<>
					{props.company && (
						<>
							<div className="company_header">
								<div className="company_name">
									<h2>{props.company.bname}</h2>
									<p>
										Joined date:{" "}
										<strong>
											{new Date(props.company.date).toLocaleDateString()}
										</strong>

									</p>
								</div>
								<div className="company_score">
									<h2>Risk Score: {props.company.riskScore}</h2>
									<button>Edit Score</button>
								</div>
								<div className="header_buttons">
									<button className="ban">Ban User</button>
									<button className="delete">Delete Account</button>
								</div>
							</div>

							{/* body */}
							<div className="company_body">

								{/* add vulnerabilities */}
								<div className="edit_form">
									<h3>Add Vulnerability</h3>
									<input
										onChange={handleVulForm}
										placeholder="Vulnerability name"
										type="text"
										className="vulnerability_name"
										name="vulName"
										value={vulForm.vulName}
									/>
									<textarea
										onChange={handleVulForm}
										placeholder="Description"
										className="vulnerability_desc"
										name="vulDesc"
										value={vulForm.vulDesc}
										id="vdesc"
										cols="30"
										rows="10"
									></textarea>
									<input
										onChange={handleVulForm}
										placeholder="Type(Application, Phishing, Network)"
										type="text"
										className="vulnerability_type"
										name="vulType"
										value={vulForm.vulType}
									/>
									<button onClick={handleSubmit} className="add_vul">{isAdding?<CircularProgress style={{color: "white"}} thickness={6} size={12} color="secondary" />:"Add"}</button>
								</div>

								{/* edit vulnerabilities */}
								<div className="edit_vulnerabilities">
									{props.vulnerabilities.length?<>{props.vulnerabilities.map((ele, i) => <Vulnerability handleSwitch={handleSwitch} isSwitching={isSwitching} key={ele._id} id={ele._id} vulnerability={ele} /> )}</>: <h1 style={{textAlign: "center"}}>No Vulnerabilities</h1> }
								</div>
									
							</div>
						</>
					)}
				</>
			
		</div>
	);
}

const Vulnerability=({vulnerability, id, isSwitching, handleSwitch})=>{
	// paid: true
	// status: "In Progress"
	// vulDesc: "vuldesc 1"
	// vulName: "vul1"
	const statusColor = vulnerability.status==="In Progress"? " rgb(255, 170, 42)":"rgb(70, 177, 9)"
    return(
        <div className="vul_tab">
            <p className="vul_name"> {vulnerability.vulName} </p> 
			<p className="vul_status">Status: <span style={{color: statusColor}}>{vulnerability.status} </span></p> 
            <button disabled={isSwitching.status} onClick={()=>handleSwitch(id)}>{(isSwitching.status&& isSwitching.id===id)?<CircularProgress style={{color: "white"}} thickness={8} size={10} color="secondary" />:"Switch Status"}</button>         
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
		loading: state.company.loading,
		company: state.company.success.data,
		error: state.company.error,
		vulnerabilities: state.company.vulnerabilities,
		isAdding: state.company.isAdding,
		isSwitching: state.company.isSwitching
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompany: (id) => dispatch(fetchCompany(id)),
		fetchVulnerabilities: (id) => dispatch(fetchVulnerabilities(id)),
		addVulnerability: (data)=> dispatch(addVulnerability(data)),
		switchStatus: (id)=>dispatch(switchStatus(id))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
