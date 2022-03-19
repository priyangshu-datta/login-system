// require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const VerifyRoute = require("./routes/verifyJWT");
const SigninRoute = require("./routes/signin");
const CheckRoute = require("./routes/checkuser");
const SignupRoute = require("./routes/signup");
const SignoutRoute = require("./routes/signout");
const UpdateRoute = require("./routes/update");
const GenTokenRoute = require("./routes/gentoken");
const mongoose = require("mongoose");
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) =>
	res.sendFile(path.join(__dirname, "build", "index.html"))
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/signin", SigninRoute);
app.use("/check", CheckRoute);
app.use("/signup", SignupRoute);
app.use("/verify", VerifyRoute);
app.use("/signout", SignoutRoute);
app.use("/update", UpdateRoute);
app.use("/token", GenTokenRoute);
mongoose.connect(process.env.URI_DB);
const db = mongoose.connection;
db.on("error", (er) => console.log(er));
db.once("open", () => console.log("opened"));

app.listen(process.env.PORT, () =>
	console.log(`Server opened at http://localhost:${process.env.PORT}`)
);
