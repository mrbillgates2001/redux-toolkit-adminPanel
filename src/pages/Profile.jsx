import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Box, Button } from "@mui/material";
import { useAuth } from "../components/Auth";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Profile = () => {
	const [show, setShow] = useState(false);
	const [info, setInfo] = useState([]);
	const { userjon } = useAuth();
	const [editLogin, setEditLogin] = useState({
		username: "",
		password: "",
	});

	const { id } = useParams();

	const handleClose = () => {
		setShow(false);
		navigate("/profile");
	};
	const handleShow = () => setShow(true);
	const navigate = useNavigate();

	const fetchInfo = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/login`);
			const data = await response.data;
			setInfo(data);
		} catch (error) {
			console.log(error);
		}
	};

	

	const fetchLoginInfo = async () => {
		try {
			const response = await axios.get(`http://localhost:3000/login/` + id);
			const data = await response.data;
			handleShow();
			setEditLogin(data);
			console.log(data)
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchInfo();
		fetchLoginInfo();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.put(
				`http://localhost:3000/login/` + id,
				editLogin
			);
			const data = await res.data;
			setEditLogin(data);
			handleClose();
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div>
			<Box sx={{ display: "flex" }}>
				// <Sidebar />
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 10,
						mt: 20,
						bgcolor: "coral",
						borderRadius: "16px",
					}}>
					<Box>
						<Box
							sx={{
								diplay: "block",
								width: "100%",
								height: "100%",
								backgroundColor: "aquamarine",
								borderRadius: "10px",
								padding: "10px",
								pl: "100px",
								mb: "20px",
							}}>
							<img src="./avatar.png" alt="" width={100} height={100} />
						</Box>
						{userjon ? (
							<Box>
								<h1>Username: {userjon.username}</h1>
								{userjon.email && <h1>Email: {userjon.email}</h1>}
								<h2>Password: {userjon.password}</h2>
							</Box>
						) : null}
					</Box>

					<Link to="/login">
						<Button variant="contained" color="warning">
							Logout
						</Button>
					</Link>
					<Button
						onClick={handleShow}
						variant="contained"
						color="secondary"
						style={{ marginLeft: "25px" }}>
						Update Profile
						<EditNoteIcon />
					</Button>
				</Box>
			</Box>

			<div>
				{/* <Button variant="outlined" color="warning">
					<EditNoteIcon />
				</Button> */}

				<Modal show={show} onHide={handleClose} className="m-4">
					<Modal.Header closeButton>
						<Modal.Title>Update user info</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="username">
								<Form.Label>Username</Form.Label>
								<Form.Control
									onChange={(e) =>
										setEditLogin({ ...editLogin, username: e.target.value })
									}
									value={editLogin.username}
									type="username"
									placeholder="John Smith"
									autoFocus
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="password">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="*****"
									onChange={(e) =>
										setEditLogin({ ...editLogin, password: e.target.value })
									}
									value={editLogin.password}
									required
									autoFocus
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button onClick={handleSubmit} type="submit" variant="primary">
							Save
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</div>
	);
};

export default Profile;
