require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../db/schema");

router.route("/").post(async (req, res) => {
	if (req.body.uname) {
		const { key, uname } = req.body;
		const identity = await User.findOne({ uname });
		if (!identity) return res.sendStatus(204);
		const decodedKey = jwt.verify(
			identity.identification,
			uname,
			(error, data) => {
				if (error) return null;
				return data;
			}
		);
		if (decodedKey === key) return res.sendStatus(202);
		return res.sendStatus(203);
	} else {
		const token = Object.keys(req.body)[0];
		const uname = jwt.verify(
			token,
			process.env.ACCESS_TOKEN,
			(error, data) => {
				if (error) return error;
				if (data.msg === undefined) return data.uname;
				else return data.msg;
			}
		);
		if (!uname) return res.sendStatus(210);
		const response = await User.exists({ uname }).then((er) => {
			if (!er) return false;
			return true;
		});
		if (response) return res.status(200).json({ uname });
		return res.sendStatus(210);
	}
});

module.exports = router;
