// require("dotenv").config();
const router = require("express").Router();
const User = require("../db/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
router.use(cookieParser(process.env.SECRET_KEY));
function accessToken({ uname, password }) {
	return !password
		? jwt.sign({ uname }, process.env.ACCESS_TOKEN, {
				expiresIn: 1000 * 60 * 15,
		  })
		: jwt.sign({ uname, password }, process.env.REFRESH_TOKEN, {
				expiresIn: 1000 * 60 * 60,
		  });
}

router.route("/").post(async (req, res) => {
	const { uname, password } = req.body;
	const user = await User.findOne({ uname });
	if (!user) return res.sendStatus(203);
	if (!(await bcrypt.compare(password, user.password)))
		return res.sendStatus(401);
	const access_token = accessToken({ uname });
	const refresh_token = accessToken({
		uname,
		password: bcrypt.hash(password, parseInt(process.env.ROUNDS)),
	});
	res.cookie("access", `${access_token}`, { maxAge: 1000 * 60 * 15 });
	res.cookie("refresh", `${refresh_token}`, {
		maxAge: 1000 * 60 * 60,
		signed: true,
	});
	return res.sendStatus(200);
});

module.exports = router;
