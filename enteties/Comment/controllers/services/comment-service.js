const ApiError = require('../../../../exceptions/api-error');
const CommentModel = require('../../models/comment-model');
const PostModel = require('../../../Blog/models/post-model');
const postService = require('../../../Blog/controllers/services/blog-service');
const { blogErrorTexts } = require('../../../../utils/constants/errorTexts');

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
			post: postId,
			text,
		});
		const commentData = await doc.save();
		return commentData;
	}

	async getAllComments(postId) {
		const { id } = await postService.getPostFromDb(postId);
		if (!id) {
			throw ApiError.BadRequest(blogErrorTexts.NOT_FOUND);
		}

		const commentsData = await CommentModel.find({ post: id });
		return commentsData;
	}
	async likeComment() {}
}

module.exports = new CommentService();
