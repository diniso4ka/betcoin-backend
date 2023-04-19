const { Schema, model } = require('mongoose');

const BannedUserSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		reason: { type: String },
		email: { type: String, required: true },
	},
	{ timestamps: true },
);

module.exports = model('BannedUser', BannedUserSchema);
