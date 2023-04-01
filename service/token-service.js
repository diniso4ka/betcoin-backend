const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(
			payload,
			process.env.JWT_ACCESS_SECRET_KEY,
			{ expiresIn: '120m' },
			{},
		);
		const refreshToken = jwt.sign(
			payload,
			process.env.JWT_REFRESH_SECRET_KEY,
			{ expiresIn: '30d' },
			{},
		);
		return {
			accessToken,
			refreshToken,
		};
	}

	async saveToken(userId, refreshToken) {
		const tokenData = await TokenModel.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await TokenModel.create({ user: userId, refreshToken });
		return token;
	}

	async removeToken(refreshToken) {
		const tokenData = await TokenModel.deleteOne({ refreshToken });
		return tokenData;
	}

	async validateAccessToken(token) {
		try {
			const userData = await jwt.verify(
				token,
				process.env.JWT_ACCESS_SECRET_KEY,
			);
			return userData;
		} catch (err) {
			return null;
		}
	}

	async validateRefreshToken(token) {
		try {
			const userData = await jwt.verify(
				token,
				process.env.JWT_REFRESH_SECRET_KEY,
			);
			return userData;
		} catch (err) {
			return null;
		}
	}

	async findToken(refreshToken) {
		const token = await TokenModel.findOne({ refreshToken });
		return token;
	}
}

module.exports = new TokenService();
