// require("dotenv").config();
const router = require("express").Router();
const User = require("../db/schema");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.use(cookieParser(process.env.SECRET_KEY));

function accessToken({ uname }) {
	return jwt.sign({ uname }, process.env.ACCESS_TOKEN, { expiresIn: 6000 });
}

router.route("/").post(async (req, res) => {
	const { refresh } = req.signedCookies;
	res.clearCookie("access");
	if (!refresh) return res.clearCookie("refresh").status(203).end();
	const uname = jwt.verify(
		refresh,
		process.env.REFRESH_TOKEN,
		(error, data) => {
			if (!error) return data.uname;
			else return null;
		}
	);
	if (!uname) return res.sendStatus(203);
	const user = await User.findOne({ uname });
	if (!user) return res.sendStatus(203);
	const access_token = accessToken({ uname });
	res.cookie("access", `${access_token}`, { maxAge: 6000 });
	return res.sendStatus(200);
});

module.exports = router;
