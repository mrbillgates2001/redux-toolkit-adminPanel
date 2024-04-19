import { useEffect, useState } from "react";
import { useAuth } from "../components/Auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Input, Checkbox } from "antd";
import React from "react";

const Login = () => {
	const { login, userjon } = useAuth();
	const navigate = useNavigate();
	const [savedLogin, setSavedLogin] = useState([]);

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const getLoginInfo = async () => {
		try {
			const res = await axios.get("http://localhost:3000/login");
			const data = await res.data;
			setSavedLogin(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getLoginInfo();
	}, []);

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});

	const onFinish = () => {
		// if (formData.username === userjon.username) {
		// 	login(formData);
		// 	navigate("/");
		// } else {
		// 	alert("Username and password do not match");
		// }
		login(formData);
		navigate("/");
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
				<h3 className="text-center">LOGIN</h3>
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
						Sign in
					</Button>
					<Link to="/signup">
						<Button type="dashed" htmlType="button" style={{ width: "100%" }}>
							Sign up
						</Button>
					</Link>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
