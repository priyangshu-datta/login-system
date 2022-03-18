require("dotenv").config();
const router = require("express").Router();
const User = require("../db/schema");
const yup = require("yup");
const bcrypt = require("bcrypt");
const randomWord = require("random-word");
const voca = require("voca");
const jwt = require("jsonwebtoken");

async function userNotExists(username) {
	const isPresent = await User.exists({ uname: username }).then((er) => {
		if (!er) return false;
		return true;
	});
	if (isPresent) return false;
	return true;
}

function generateKey() {
	let key = "";
	for (let i = 0; i < 10; i++) {
		key += `${randomWord()} `;
	}
	key = voca.trim(key);
	return key;
}

router.route("/").post(async (req, res) => {
	const { uname, email, password } = req.body;
	const user = {
		uname,
		email,
		password: await bcrypt.hash(password, process.env.ROUNDS),
	};
	const validateSchema = yup.object({
		uname: yup
			.string()
			.required()
			.test(async (value) => await userNotExists(value)),
		email: yup.string().email().required(),
		password: yup.string().required(),
	});
	const key = generateKey();
	if (await validateSchema.isValid(user)) {
		User.create({ ...user, identification: jwt.sign(key, user.uname) });
		res.statusCode = 202;
		return res.json({ key });
	} else {
		return res.sendStatus(400);
	}
});

module.exports = router;
