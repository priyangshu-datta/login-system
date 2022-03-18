import { useState } from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles.css";
import App from "./app";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Forgot from "./pages/forgot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout.js";
import axios from "axios";
function Index() {
	const [user, setUser] = useState(null);
	let access, getAccess;
	function abc() {
		access = document.cookie
			.split(";")
			.filter((txt) => txt.includes("access"))[0]
			?.split("access=")[1];
		axios.post("/token").then((res) => {
			if (res.status === 203) {
				setUser(null);
				clearInterval(getAccess);
			} else {
				if (access !== undefined)
					axios
						.post("/verify", access)
						.then((res) => {
							console.log(res.data);
							return res;
						})
						.then((data) => setUser(data.data.uname ?? null));
			}
		});
	}
	abc();
	getAccess = setInterval(abc, 6000);
	return (
		<ChakraProvider>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Layout user={user} setUser={setUser} />}>
						<Route index element={<App user={user} />} />
						<Route
							path="signin"
							element={<Signin setUser={setUser} />}
						/>
						<Route path="signup" element={<Signup />} />
						<Route path="forgot" element={<Forgot />} />
					</Route>
				</Routes>
			</Router>
		</ChakraProvider>
	);
}

render(<Index />, document.getElementById("root"));
