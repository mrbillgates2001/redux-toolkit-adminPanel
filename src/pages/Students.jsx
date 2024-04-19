import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button, TextField, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import DeleteIcon from "@mui/icons-material/Delete";
import AddStudent from "../components/AddStudent";
import { Link } from "react-router-dom";
import EditStudent from "../components/EditStudent";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudents, fetchStudents } from "../app/students/studentSlice";
import Form from "react-bootstrap/Form";

const Teachers = () => {
	const [search, setSearch] = React.useState("");
	const [show, setShow] = React.useState(false);
	const dispatch = useDispatch();
	const { students } = useSelector((state) => state.student);
	const [filteredUser, setFilteredUser] = React.useState(students);
	const [selectedFilter, setSelectedFilter] = React.useState("");

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	React.useEffect(() => {
		dispatch(fetchStudents());
	}, [filteredUser, fetchStudents]);

	///////////////// DELETE /////////////////

	const handleDelete = async (id) => {
		if (confirm("Are you sure you want to delete this student?")) {
			dispatch(deleteStudents(id));
		}
	};

	//////////////// FILTER //////////////////

	const handleFilterChange = (e) => {
		const filterValue = e.target.value;
		setSelectedFilter(filterValue);

		if (filterValue !== "All Groups") {
			const filtered = students.filter((user) => user.group === filterValue);
			setFilteredUser(filtered);
			dispatch(fetchStudents);
		} else {
			setFilteredUser(students);
			dispatch(fetchStudents);
		}
	};

	return (
		<Box sx={{ display: "flex" }}>
			// <Sidebar />
			<Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10 }}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						py: 2,
					}}>
					<Typography variant="h5" sx={{ mb: "15px" }}>
						Students
					</Typography>
					<TextField
						id="standard-search"
						label="🔍 Search by name..."
						type="search"
						variant="outlined"
						onChange={(e) => setSearch(e.target.value)}
						sx={{
							width: "600px",
						}}
					/>

					<Form.Select
						value={selectedFilter}
						onChange={handleFilterChange}
						style={{ width: "200px", fontSize: "16px" }}
						size="small"
						aria-label="Default select example">
						<option value="All Groups">All Groups</option>
						<option value="Group 1">Group 1</option>
						<option value="Group 2">Group 2</option>
						<option value="Group 3">Group 3</option>
						<option value="Group 4">Group 4</option>
					</Form.Select>

					<AddStudent fetchStudents={fetchStudents} />
				</Box>
				<Paper sx={{ width: "100%", overflow: "hidden" }}>
					<TableContainer sx={{ maxHeight: 440 }}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow sx={{ width: 100 }}>
									<TableCell>ID</TableCell>
									<TableCell>Fullname</TableCell>
									<TableCell>Group</TableCell>
									<TableCell>Phone</TableCell>
									<TableCell>Action</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredUser.length > 0
									? filteredUser
											.filter((student) => {
												return search.toLocaleLowerCase() === ""
													? student
													: student.fullname
															.toLocaleLowerCase()
															.includes(search);
											})
											.map((student, index) => (
												<TableRow key={student.id}>
													<TableCell component="th" scope="row">
														{index + 1}
													</TableCell>
													<TableCell>{student.fullname}</TableCell>
													<TableCell>{student.group}</TableCell>
													<TableCell>{student.phone}</TableCell>
													<TableCell
														sx={{
															display: "flex",
															alignItems: "center",
															gap: "10px",
														}}>
														<Link to={`/students/editstudent/${student.id}`}>
															<EditStudent />
														</Link>
														<Button
															variant="outlined"
															color="error"
															onClick={() => handleDelete(student.id)}>
															<DeleteIcon />
														</Button>
													</TableCell>
												</TableRow>
											))
									: students
											.filter((student) => {
												return search.toLocaleLowerCase() === ""
													? student
													: student.fullname
															.toLocaleLowerCase()
															.includes(search);
											})
											.map((student, index) => (
												<TableRow key={student.id}>
													<TableCell component="th" scope="row">
														{index + 1}
													</TableCell>
													<TableCell>{student.fullname}</TableCell>
													<TableCell>{student.group}</TableCell>
													<TableCell>{student.phone}</TableCell>
													<TableCell
														sx={{
															display: "flex",
															alignItems: "center",
															gap: "10px",
														}}>
														<Link to={`/students/editstudent/${student.id}`}>
															<EditStudent />
														</Link>
														<Button
															variant="outlined"
															color="error"
															onClick={() => handleDelete(student.id)}>
															<DeleteIcon />
														</Button>
													</TableCell>
												</TableRow>
											))}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Box>
		</Box>
	);
};

export default Teachers;
