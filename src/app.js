import React from "react";
import axios from "axios";

function App(props) {
	return (
		<>{!props.user ? `Hello, please signin.` : `Hello, ${props.user}`}</>
	);
}

export default App;
