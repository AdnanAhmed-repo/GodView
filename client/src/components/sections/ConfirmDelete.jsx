import React, { useState } from "react";
import Axios from "axios";
import Modal from "react-modal";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./ConfirmDelete.css";

Modal.setAppElement("#root");

const ConfirmDelete = ({ modal, setModal, id, history }) => {
	const [loading, setLoading] = useState(false);

	const handleConfirmedAccountDelete = async () => {
		setLoading(true);
		// send action Request here
		try {
			const response = await Axios.delete(
				`http://localhost:5001/api/admin-dashboard/deleteuser/${id}`
			);
			setModal(false);

			if (response.data.success) {
				setLoading(false);
				history.push("/admin-dashboard");
			}
		} catch (error) {
			setLoading(false);
			console.log("Error in Deleting from FE = ", error);
		}
	};
	const customStyles = {
		overlay: {
			backgroundColor: "rgba(0, 0, 0, 0.416)",
		},
		content: {
			padding: 0,
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
	};

	return (
		<Modal isOpen={modal} style={customStyles}>
			<div className="delete_account">
				{loading ? (
					<CircularProgress
						style={{ color: "white" }}
						thickness={7}
						size={50}
						color="secondary"
					/>
				) : (
					<>
						<h1>Confirm Delete ?</h1>
						<p>This operation cannot be undone.</p>
						<div className="confirm_buttons">
							<button
								className="confirm_yes confirm_button"
								onClick={handleConfirmedAccountDelete}
							>
								{" "}
								Delete{" "}
							</button>
							<button
								className="confirm_no confirm_button"
								onClick={() => setModal(false)}
							>
								{" "}
								Cancel{" "}
							</button>
						</div>
					</>
				)}
			</div>
		</Modal>
	);
};

export default ConfirmDelete;
