import React, { useState, useEffect } from "react";
import CustomNavBar from "./navbar";
import { Outlet } from "react-router-dom";
import axios from "axios";

function layout(props) {
	return (
		<>
			<CustomNavBar user={props.user} />
			<Outlet />
		</>
	);
}

export default layout;
