import { useState } from "react";
import { Card } from "react-bootstrap";
import {
	Button,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	HStack,
	Flex,
} from "@chakra-ui/react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function signin(props) {
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	function handleSignin(values) {
		axios.post("/signin", values).then((res) => {
			setLoading(true);
			if (res.status === 200) {
				props.setUser(values.uname);
				navigate("/");
			} else if (res.status === 401) {
				setLoading(false);
				console.log(res.statusText);
			}
		});
	}
	return (
		<>
			<Card className="m-auto mt-2 max-w-xl">
				<Card.Body>
					<Formik
						onSubmit={handleSignin}
						initialValues={{ uname: "", password: "" }}
						validationSchema={yup.object().shape({
							uname: yup
								.string()
								.required("Username is required"),
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
							<HStack alignItems="center">
								<Button
									isLoading={isLoading}
									className="mt-3"
									type="Submit"
									variant="solid"
									colorScheme="teal">
									Signin
								</Button>
								<Link
									className={`mt-3 ${
										isLoading ? "hidden" : ""
									}`}
									to="/forgot">
									Forget Password?
								</Link>
							</HStack>
						</Form>
					</Formik>
				</Card.Body>
			</Card>
		</>
	);
}

export default signin;
