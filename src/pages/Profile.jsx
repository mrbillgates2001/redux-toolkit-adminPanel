import React from "react";
import Sidebar from "../components/Sidebar";
import { Box, Button } from "@mui/material";
import { useAuth } from "../components/Auth";
import EditNoteIcon from "@mui/icons-material/EditNote";

const Profile = () => {
	const { userjon } = useAuth();

	return (
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
							<h2>Password: {userjon.password}</h2>
						</Box>
					) : null}
				</Box>

				<Button variant="contained" color="warning">
					Logout
				</Button>
				<Button
					variant="contained"
					color="secondary"
					style={{ marginLeft: "25px" }}>
					Update Profile
					<EditNoteIcon />
				</Button>
			</Box>
		</Box>
	);
};

export default Profile;
