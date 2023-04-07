const ApiError = require('../exceptions/api-error');
const tokenService = require('../features/Token/services/token-service');

module.exports = async function (req, res, next) {
	try {
		const authorizationHeader = req.headers.authorization;
		if (!authorizationHeader) {
			return next(ApiError.UnauthorizedError());
		}

		const accessToken = authorizationHeader.split(' ')[1];
		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}

		const userData = await tokenService.validateAccessToken(accessToken);
		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}
		req.user = userData;
		next();
	} catch (err) {
		return next(ApiError.UnauthorizedError());
	}
};
