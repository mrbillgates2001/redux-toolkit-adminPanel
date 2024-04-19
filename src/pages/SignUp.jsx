import { useState } from "react";
import { useAuth } from "../components/Auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, Checkbox } from "antd";
import React from "react";

const SignUp = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	// const onFinish = (e) => {
	// 	console.log("Success:", values);
	// };
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const onFinish = async () => {
		try {
			if (formData.username.length >= 3 && formData.password.length >= 3) {
				login(formData);
				const response = await axios.post(
					"http://localhost:3000/login",
					formData
				);
				navigate("/login");
				console.log("Login data saved successfully:", response.data);
			} else {
				alert("Username and password should be more than 3 characters");
			}
		} catch (error) {
			console.error("Error saving login data:", error);
			// Handle error response here
		}
	};

	return (
		<div
			className="flex items-center mx-auto w-25"
			style={{
				border: "1px solid black",
				padding: "20px",
				marginTop: "100px",
				backgroundColor: "lightgray",
				borderRadius: "16px",
			}}>
			<Form
				name="basic"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				style={{
					maxWidth: 600,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off">
				<h6 className="text-center">REGISTRATION</h6>
				<Form.Item
					label="Username"
					name="username"
					values={formData.username}
					onChange={(e) =>
						setFormData({ ...formData, username: e.target.value })
					}
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					values={formData.email}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					rules={[
						{
							required: true,
							message: "Please input your email!",
						},
					]}>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					values={formData.password}
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="remember"
					valuePropName="checked"
					wrapperCol={{
						offset: 8,
						span: 16,
					}}>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}>
					<Button
						type="primary"
						htmlType="submit"
						style={{ width: "100%", marginBottom: "20px" }}>
						Sign up
					</Button>
					<Link to="/login">
						<Button type="dashed" htmlType="button" style={{ width: "100%" }}>
							back to login
						</Button>
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default SignUp;
