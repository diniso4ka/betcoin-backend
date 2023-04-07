const commentService = require('./services/comment-service');

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

			res.status(200).json({
				message: 'Комментарий создан',
				comment: commentData,
			});
		} catch (err) {
			next(err);
		}
	}

	async likeComment() {}
}

module.exports = new CommentController();
