import { useState } from "react";
import { Card } from "react-bootstrap";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
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
				<div>
					<div>
						Note the security key <code>{key}</code>. It will be
						used to reset your password
					</div>
					<form onSubmit={Home}>
						<Button isLoading={isLoading} type="Submit">
							Continue
						</Button>
					</form>
				</div>
			)}
		</>
	);
}

export default signup;

/* 


sacralising noncoking instinctive datallers mensed perisarcs straightjacket cybercafes sanguifying mewed


<FloatingLabel
	controlId="floatingInput"
	label="Email address"
	className="mb-3">
	<Form.Control
		type="email"
		name="email"
		placeholder="name@example.com"
	/>
</FloatingLabel>

<FloatingLabel
	controlId="floatingPassword"
	label="Password">
	<Form.Control
		type="password"
		name="password"
		placeholder="Password"
	/>
</FloatingLabel>

*/
