import { Select } from "flowbite-react";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addStudents } from "../app/students/studentSlice";

const AddStudent = ({ fetchStudents }) => {
	const [show, setShow] = useState(false);
	const dispatch = useDispatch();
	const { newStudent, loading, error } = useSelector((state) => state.student);
	const [addUser, setAddUseer] = useState({
		fullname: "",
		group: "",
		phone: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleAddSubmit = async (e) => {
		e.preventDefault();
		dispatch(addStudents(addUser));
		handleClose();
		setAddUseer({
			fullname: "",
			group: "",
			phone: "",
		});
	};

	return (
		<div>
			<button className="btn btn-success" onClick={handleShow}>
				Add +
			</button>

			<Modal show={show} onHide={handleClose} className="m-4">
				<Modal.Header closeButton>
					<Modal.Title>Add new student</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleAddSubmit}>
						<Form.Group className="mb-3" controlId="fullname">
							<Form.Label>Fullname</Form.Label>
							<Form.Control
								id="input"
								onChange={(e) =>
									setAddUseer({ ...addUser, fullname: e.target.value })
								}
								value={addUser.fullname}
								type="name"
								placeholder="John Smith"
								autoFocus
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="group">
							<Form.Label>Group</Form.Label>
							<Select
								onChange={(e) =>
									setAddUseer({ ...addUser, group: e.target.value })
								}
								value={addUser.group}
								required>
								<option>Choose your group</option>
								<option>Group 1</option>
								<option>Group 2</option>
								<option>Group 3</option>
								<option>Group 4</option>
							</Select>
						</Form.Group>
						<Form.Group className="mb-3" controlId="phone">
							<Form.Label>Phone</Form.Label>
							<Form.Control
								type="phone"
								placeholder="+998(90)-123-45-67"
								onChange={(e) =>
									setAddUseer({ ...addUser, phone: e.target.value })
								}
								value={addUser.phone}
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
					<Button type="submit" variant="primary" onClick={handleAddSubmit}>
						Save
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default AddStudent;
