import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

export default function navbar(props) {
	const navigate = useNavigate();
	const user = props.user;
	const [width, setWidth] = useState(window.innerWidth);
	window.addEventListener("resize", (e) => {
		setWidth(e.target.innerWidth);
	});
	function Signout() {
		axios.post("/signout").then((res) => navigate("/"));
	}
	return (
		<>
			<Navbar bg="light" expand="lg">
				<Container fluid>
					<Navbar.Brand href="/">Login System</Navbar.Brand>
					{!user ? (
						<>
							<Navbar.Toggle />
							<Navbar.Collapse id="navbarScroll">
								<Nav
									className="me-auto my-2 my-lg-0"
									style={{ maxHeight: "200px" }}
									navbarScroll>
									<Link to="signin" className="mr-3">
										Singin
									</Link>
									<Link to="signup">Signup</Link>
								</Nav>
							</Navbar.Collapse>
						</>
					) : (
						<>
							{width < 992 ? (
								<>
									<Navbar.Toggle>{user}</Navbar.Toggle>
									<Navbar.Collapse id="navbarScroll">
										<Nav
											className="me-auto my-2 my-lg-0"
											style={{ maxHeight: "200px" }}
											navbarScroll>
											<form onSubmit={Signout}>
												<button type="Submit">
													Signout
												</button>
											</form>
										</Nav>
									</Navbar.Collapse>
								</>
							) : (
								<>
									<h1>{user}</h1>
									<form onSubmit={Signout}>
										<button type="Submit">Signout</button>
									</form>
								</>
							)}
							{/* <Navbar.Toggle>{user}</Navbar.Toggle> */}
						</>
					)}
				</Container>
			</Navbar>
		</>
	);
}
