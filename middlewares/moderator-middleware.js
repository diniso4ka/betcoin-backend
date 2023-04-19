const ApiError = require('../exceptions/api-error');
const {
	USER_ROLE_ADMIN,
	USER_ROLE_MODERATOR,
} = require('../utils/constants/roles');

module.exports = async function (req, res, next) {
	try {
		const userRole = req.user.role;

		if (userRole === USER_ROLE_ADMIN || userRole === USER_ROLE_MODERATOR) {
			return next();
		}
		return next(ApiError.Forbidden('Недостаточно прав'));
	} catch (err) {
		return next(ApiError.Forbidden('Недостаточно прав'));
	}
};
