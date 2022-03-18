const router = require("express").Router();
const User = require("../db/schema");

router.route("/").post(async (req, res) => {
	const username = Object.keys(req.body)[0];
	const isPresent = await User.exists({ uname: username }).then((er) => {
		if (!er) return false;
		return true;
	});
	if (isPresent) {
		res.statusMessage = "User exists";
		return res.sendStatus(204);
	}
	return res.sendStatus(200);
});

module.exports = router;
