const { Schema, model } = require('mongoose');
const ROLES = require('../utils/constants/roles');

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	role: { type: String, default: ROLES.GUEST },
	balance: { type: Number, default: 0 },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
	accessLink: { type: String, default: '' },
});

module.exports = model('User', UserSchema);
