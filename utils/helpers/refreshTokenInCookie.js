module.exports = (res, userData) => {
	res.cookie('refreshToken', userData.refreshToken, {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	});
};
