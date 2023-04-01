const bcrypt = require('bcrypt');
const uuid = require('uuid');

const UserModel = require('../models/user-model');

const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const ROLES = require('../utils/constants/roles');

class UserService {
	async registration(email, username, password) {
		const uniqueEmail = await UserModel.findOne({ email });
		if (uniqueEmail) {
			throw ApiError.BadRequest(
				400,
				`Пользователь с почтовым адресом ${email} уже существует`,
			);
		}
		const uniqueUsername = await UserModel.findOne({ username });
		if (uniqueUsername) {
			throw ApiError.BadRequest(
				400,
				`Пользователь с именем ${username} уже существует`,
			);
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const user = await UserModel.create({
			email,
			username,
			password: hashPassword,
			activationLink,
		});
		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/auth/activate/${activationLink}`,
		);

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: { ...userDto },
		};
	}

	async login(login, password) {
		const loginByMail = await UserModel.findOne({ email: login });
		const loginByUsername = await UserModel.findOne({ username: login });
		let user;
		if (loginByMail) {
			user = loginByMail;
		}
		if (loginByUsername) {
			user = loginByUsername;
		}
		if (!user) {
			throw ApiError.NotFound('Пользователь не найден');
		}
		const isPassEquals = bcrypt.compare(password, user.password);
		if (!isPassEquals) {
			throw ApiError.BadRequest('Неверный пароль');
		}
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: { ...userDto },
		};
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ activationLink });
		if (!user) {
			throw ApiError.BadRequest('Неккоректная ссылка активации');
		}
		user.isActivated = true;
		user.role = ROLES.PLAYER;
		await user.save();
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}
		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = UserModel.findOne(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: { ...userDto },
		};
	}

	async getAccessLink(email) {
		if (!email) {
			throw ApiError.BadRequest('Введите почту');
		}
		const userData = await UserModel.findOne({ email });

		if (!userData) {
			throw ApiError.BadRequest('Пользователь не найден');
		}
		const accessLink = uuid.v4();
		userData.accessLink = accessLink;
		await userData.save();
		await mailService.sendAccessLink(
			email,
			`${process.env.API_URL}/auth/accesslink/${accessLink}`,
		);
		return {
			email,
		};
	}
}

module.exports = new UserService();
