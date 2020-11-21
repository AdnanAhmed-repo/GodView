import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
	fetchCompany,
	fetchVulnerabilities,
	addVulnerability,
	switchStatus,
	editScore,
} from "../../redux/actions/companyActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import ConfirmDelete from "./ConfirmDelete";

import "./CompanyDetails.css";

const CompanyDetails = ({ isAdding, isSwitching, isEditing, ...props }) => {
	const [vulForm, setVulForm] = useState({
		vulName: "",
		vulDesc: "",
		vulType: "",
	});

	const [modal, setModal] = useState(false);
	const [edit, setEdit] = useState(false);
	const [editInput, setEditInput] = useState("");

	useEffect(() => {
		let id = props.props.match.params.id;
		props.fetchCompany(id, props.props.history);
		props.fetchVulnerabilities({ userId: id });
	}, [isAdding, isSwitching, isEditing]);

	const handleVulForm = (e) => {
		setVulForm({ ...vulForm, [e.target.name]: e.target.value });
	};

	const handleEditClick = () => {
		setEditInput(props.company.riskScore);
		setEdit(true);
	};

	const handleSaveClick = () => {
		let id = props.props.match.params.id;
		if (Number(editInput) >= 0 && Number(editInput) <= 100) {
			props.editScore({ id, newScore: editInput });
			setEdit(false);
		} else {
			alert("Value should be in range 0-100");
		}
	};

	const handleSubmit = () => {
		let id = props.props.match.params.id;
		let data = { ...vulForm, userId: id };
		setVulForm({ ...vulForm, vulName: "", vulDesc: "", vulType: "" });
		props.addVulnerability(data);
	};

	const handleSwitch = (id) => {
		console.log("==================", isSwitching);
		let userId = props.props.match.params.id;
		props.switchStatus(id, userId);
	};

	return (
		<div className="company_details">
			<ConfirmDelete
				modal={modal}
				setModal={setModal}
				id={props.props.match.params.id}
				history={props.props.history}
			/>
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
								<h2>
									Risk Score:{" "}
									{edit ? (
										<input
											onChange={(e) => setEditInput(e.target.value)}
											value={editInput}
										/>
									) : isEditing || props.loading || isSwitching.status ? (
										<CircularProgress
											style={{ color: "black" }}
											thickness={10}
											size={12}
											color="secondary"
										/>
									) : (
										props.company.riskScore
									)}
								</h2>
								{edit ? (
									<button onClick={handleSaveClick}>Save</button>
								) : (
									<button onClick={handleEditClick}>Edit Score</button>
								)}
							</div>
							<div className="header_buttons">
								<button className="ban">Ban User</button>
								<button onClick={() => setModal(true)} className="delete">
									Delete Account
								</button>
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
								<button onClick={handleSubmit} className="add_vul">
									{isAdding ? (
										<CircularProgress
											style={{ color: "white" }}
											thickness={6}
											size={12}
											color="secondary"
										/>
									) : (
										"Add"
									)}
								</button>
							</div>

							{/* edit vulnerabilities */}
							<div className="edit_vulnerabilities">
								{props.vulnerabilities.length ? (
									<>
										{props.vulnerabilities.map((ele, i) => (
											<Vulnerability
												handleSwitch={handleSwitch}
												isSwitching={isSwitching}
												key={ele._id}
												id={ele._id}
												vulnerability={ele}
											/>
										))}
									</>
								) : (
									<h1 style={{ textAlign: "center" }}>No Vulnerabilities</h1>
								)}
							</div>
						</div>
					</>
				)}
			</>
		</div>
	);
};

const Vulnerability = ({ vulnerability, id, isSwitching, handleSwitch }) => {
	// paid: true
	// status: "In Progress"
	// vulDesc: "vuldesc 1"
	// vulName: "vul1"
	const statusColor =
		vulnerability.status === "In Progress"
			? " rgb(255, 170, 42)"
			: "rgb(70, 177, 9)";
	return (
		<div className="vul_tab">
			<p className="vul_name"> {vulnerability.vulName} </p>
			<p className="vul_status">
				Status:{" "}
				<span style={{ color: statusColor }}>{vulnerability.status} </span>
			</p>
			<button disabled={isSwitching.status} onClick={() => handleSwitch(id)}>
				{isSwitching.status && isSwitching.id === id ? (
					<CircularProgress
						style={{ color: "white" }}
						thickness={8}
						size={10}
						color="secondary"
					/>
				) : (
					"Switch Status"
				)}
			</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		loading: state.company.loading,
		company: state.company.success.data,
		error: state.company.error,
		vulnerabilities: state.company.vulnerabilities,
		isAdding: state.company.isAdding,
		isSwitching: state.company.isSwitching,
		isEditing: state.company.isEditing,
	};
};

export default connect(mapStateToProps, {
	fetchCompany,
	fetchVulnerabilities,
	addVulnerability,
	switchStatus,
	editScore,
})(CompanyDetails);
