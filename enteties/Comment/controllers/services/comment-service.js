const ApiError = require('../../../../exceptions/api-error');
const CommentModel = require('../../models/comment-model');
const PostModel = require('../../../Blog/models/post-model');

class CommentService {
	async createComment(postId, userId, comment) {
		const post = await PostModel.findOne({ _id: postId });
		if (!post) {
			throw ApiError.BadRequest('Пост не найден');
		}
		const { text } = comment;
		if (!text) {
			throw ApiError.BadRequest('Введите текст');
		}
		const doc = new CommentModel({
			user: userId,
			text,
		});
		const commentData = await doc.save();
		return commentData;
	}
	async likeComment() {}
}

module.exports = new CommentService();
