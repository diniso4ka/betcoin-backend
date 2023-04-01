const blogService = require('../service/blog-service');
const ApiError = require('../exceptions/api-error');

module.exports = async function (req, res, next) {
	try {
		const postId = req.params.postId;
		const userId = req.user.id;
		const userRole = req.user.role;
		const post = await blogService.getPostFromDb(postId);
		if (!post) {
			return next(ApiError.BadRequest('Пост не найден'));
		}

		if (userRole === 'admin' || userRole === 'moderator') {
			next();
		}

		if (post.user.toString() !== userId) {
			return next(ApiError.Forbidden('Недостаточно прав'));
		}
		next();
	} catch (err) {
		return next(ApiError.Forbidden('Недостаточно прав'));
	}
};
