const router = require("express").Router();

router.route("/").post(async (req, res) => {
	res.clearCookie("refresh");
	res.clearCookie("access").sendStatus(200);
});

module.exports = router;
