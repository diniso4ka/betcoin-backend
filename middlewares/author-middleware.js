const blogService = require('../enteties/Blog/controllers/services/blog-service');
const ApiError = require('../exceptions/api-error');

const {
	USER_ROLE_ADMIN,
	USER_ROLE_MODERATOR,
} = require('../utils/constants/roles');

module.exports = async function (req, res, next) {
	try {
		const postId = req.params.postId;
		const userId = req.user.id;
		const userRole = req.user.role;
		const post = await blogService.getPostFromDb(postId);
		if (!post) {
			return next(ApiError.BadRequest('Пост не найден'));
		}

		if (userRole === USER_ROLE_ADMIN || userRole === USER_ROLE_MODERATOR) {
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
