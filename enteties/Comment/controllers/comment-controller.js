const commentService = require('./services/comment-service');
const blogService = require('../../Blog/controllers/services/blog-service');

class CommentController {
	async createComment(req, res, next) {
		try {
			const postId = req.params.postId;
			const { id } = req.user;
			const comment = req.body;
			const commentData = await commentService.createComment(
				postId,
				id,
				comment,
			);
			await blogService.commentCounterIncrement(postId);
			return res.status(200).json({
				message: 'Комментарий создан',
				comment: commentData,
			});
		} catch (err) {
			next(err);
		}
	}

	async getAllComments(req, res, next) {
		try {
			const postId = req.params.postId;
			const commentsData = await commentService.getAllComments(postId);

			return res.status(200).json(commentsData);
		} catch (err) {
			next(err);
		}
	}

	async likeComment() {}
}

module.exports = new CommentController();
