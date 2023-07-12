const jwt = require('jsonwebtoken');
const User = require('../models/User')
require("dotenv").config();

exports = {}

exports.getToken = () => {
	const token = jwt.sign(
		{ identifier: User._id },
		"process.env.JWT_SECRET_KEY");
	return token;
}

module.exports = exports;