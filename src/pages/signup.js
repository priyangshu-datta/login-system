import { useState } from "react";
import { Card } from "react-bootstrap";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	VStack,
} from "@chakra-ui/react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function signup() {
	const [isLoading, setLoading] = useState(false);
	const [key, setKey] = useState(null);
	const navigate = useNavigate();
	async function checkUsername(value) {
		const response = await axios.post("/check", value);
		if (response.status === 204) return false;
		return true;
	}
	function Home() {
		setLoading(true);
		navigate("/signin");
	}
	async function handleSignup(values) {
		const response = await axios.post("/signup", values);
		setLoading(true);
		if (response.status === 202) {
			setLoading(false);
			setKey(response.data.key);
		} else {
			console.log("Wrong");
		}
	}
	return (
		<>
			{!key ? (
				<Card className="m-auto mt-2 max-w-xl">
					<Card.Body>
						<Formik
							onSubmit={handleSignup}
							initialValues={{
								uname: "",
								email: "",
								password: "",
							}}
							validationSchema={yup.object().shape({
								uname: yup
									.string()
									.required("Username is required")
									.test(
										"user-check",
										(d) => "Use another username",
										async (value) =>
											await checkUsername(value)
									),
								email: yup
									.string()
									.email("Invalid Email address")
									.required("Email is required"),
								password: yup
									.string()
									.required("Password is required"),
							})}>
							<Form>
								<Field name="uname">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.uname &&
												form.touched.uname
											}>
											<FormLabel htmlFor="uname">
												Username
											</FormLabel>
											<Input
												{...field}
												id="uname"
												placeholder="Username"
											/>
											<FormErrorMessage>
												<ErrorMessage name="uname" />
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Field name="email">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.email &&
												form.touched.email
											}>
											<FormLabel htmlFor="email">
												Email
											</FormLabel>
											<Input
												{...field}
												id="email"
												placeholder="Email"
											/>
											<FormErrorMessage>
												<ErrorMessage name="email" />
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Field name="password">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.password &&
												form.touched.password
											}>
											<FormLabel htmlFor="password">
												Password
											</FormLabel>
											<Input
												id="password"
												type={"password"}
												{...field}
												placeholder="Password"
											/>
											<FormErrorMessage>
												<ErrorMessage name="password" />
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Button
									isLoading={isLoading}
									className="mt-3"
									type="Submit"
									variant="solid"
									colorScheme="teal">
									Signup
								</Button>
							</Form>
						</Formik>
					</Card.Body>
				</Card>
			) : (
				<Card className="m-auto mt-2 max-w-xl p-2">
					<VStack>
						<div className="text-center">
							<strong>
								The following security key will be used to reset
								your password. Please keep it safe.
							</strong>
							<Card className="m-auto">
								<Card.Body className="py-2 w-fit">
									<code>{key}</code>
									<br />
									<Button
										size="sm"
										colorScheme="blue"
										onClick={(e) => {
											let flag = true;
											if (flag) {
												flag = false;
												navigator.clipboard.writeText(
													key
												);
												e.target.innerText = "Copied!";
											}
											setTimeout(() => {
												e.target.innerText = "Copy Key";
												flag = true;
											}, 2000);
										}}>
										Copy Key
									</Button>
								</Card.Body>
							</Card>
						</div>
						<form onSubmit={Home}>
							<Button
								isLoading={isLoading}
								colorScheme="teal"
								type="Submit">
								Continue
							</Button>
						</form>
					</VStack>
				</Card>
			)}
		</>
	);
}

export default signup;
