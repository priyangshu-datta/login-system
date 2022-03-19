// require("dotenv").config();
const router = require("express").Router();
const User = require("../db/schema");
const yup = require("yup");
const bcrypt = require("bcrypt");

async function userExists(username) {
	const isPresent = await User.exists({ uname: username }).then((er) => {
		if (!er) return false;
		return true;
	});
	if (isPresent) return true;
	return false;
}

router.route("/").post(async (req, res) => {
	const { uname, password } = req.body;
	const user = { uname, password };
	const validateSchema = yup.object({
		uname: yup
			.string()
			.required()
			.test(async (value) => await userExists(value)),
		password: yup.string().required(),
	});
	if (await validateSchema.isValid(user)) {
		await User.updateOne(
			{ uname },
			{
				password: await bcrypt.hash(
					password,
					parseInt(process.env.ROUNDS)
				),
			}
		);
		return res.sendStatus(200);
	} else {
		return res.sendStatus(400);
	}
});

module.exports = router;
