import { useState, useRef } from "react";
import { Card } from "react-bootstrap";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function forgot() {
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [accepted, isAccepted] = useState(false);
	const uname = useRef(null);
	async function handleForgot(values) {
		uname.current = values.uname;
		const result = await axios.post("/verify", values);
		if (result.status === 202) isAccepted(true);
	}
	async function changePassword(values) {
		const response = await axios.post("/update", {
			uname: uname.current,
			password: values.new_password,
		});
		if (response.status === 200) {
			navigate("/signin");
		}
	}
	return (
		<>
			{!accepted ? (
				<Card className="m-auto mt-2 max-w-xl">
					<Card.Body>
						<Formik
							onSubmit={handleForgot}
							initialValues={{ uname: "", key: "" }}
							validationSchema={yup.object().shape({
								uname: yup
									.string()
									.required("Username is required"),
								key: yup.string().required("Key is required"),
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
								<Field name="key">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.key &&
												form.touched.key
											}>
											<FormLabel htmlFor="key">
												Key
											</FormLabel>
											<Input
												{...field}
												id="key"
												placeholder="Enter the security Key"
											/>
											<FormErrorMessage>
												<ErrorMessage name="key" />
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<HStack alignItems="center">
									<Button
										isLoading={isLoading}
										className="mt-3"
										type="Submit"
										variant="solid"
										colorScheme="teal">
										Submit
									</Button>
									<Link
										className={`mt-3 ${
											isLoading ? "hidden" : ""
										}`}
										to="/signin">
										Back
									</Link>
								</HStack>
							</Form>
						</Formik>
					</Card.Body>
				</Card>
			) : (
				<Card className="m-auto mt-2 max-w-xl">
					<Card.Body>
						<Formik
							onSubmit={changePassword}
							initialValues={{
								new_password: "",
							}}
							validationSchema={yup.object().shape({
								new_password: yup
									.string()
									.required("Enter a new Password"),
							})}>
							<Form>
								<Field name="new_password">
									{({ field, form }) => (
										<FormControl
											isInvalid={
												form.errors.new_password &&
												form.touched.new_password
											}>
											<FormLabel htmlFor="new_password">
												New Password
											</FormLabel>
											<Input
												{...field}
												type="password"
												id="new_password"
												placeholder="Enter new Password"
											/>
											<FormErrorMessage>
												<ErrorMessage name="new_password" />
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<HStack alignItems="center">
									<Button
										isLoading={isLoading}
										className="mt-3"
										type="Submit"
										variant="solid"
										colorScheme="teal">
										Change Password
									</Button>
								</HStack>
							</Form>
						</Formik>
					</Card.Body>
				</Card>
			)}
		</>
	);
}

export default forgot;
