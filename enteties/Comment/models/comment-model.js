const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
	text: { type: String, required: true },
	likes: { type: Number, default: 0 },
	likeUsers: { type: Array, default: [] },
});

module.exports = model('Comment', CommentSchema);
