const userService = require('./services/user-service');
const refreshTokenInCookie = require('../../../utils/helpers/refreshTokenInCookie');

class UserController {
	async registration(req, res, next) {
		try {
			const { email, username, password } = req.body;
			const userData = await userService.registration(
				email,
				username,
				password,
			);

			refreshTokenInCookie(res, userData);
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async login(req, res, next) {
		try {
			const { login, password } = req.body;
			const userData = await userService.login(login, password);

			refreshTokenInCookie(res, userData);
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			return res.json({ token });
		} catch (err) {
			next(err);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);

			refreshTokenInCookie(res, userData);
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);

			return res
				.json({ message: 'Аккаунт активирован' })
				.status(200)
				.redirect(process.env.CLIENT_URL);
		} catch (err) {
			next(err);
		}
	}

	async getAccessLink(req, res, next) {
		try {
			const { email } = req.body;
			const userEmail = await userService.getAccessLink(email);

			return res.status(200).json(userEmail);
		} catch (err) {
			next(err);
		}
	}

	async getAccess(req, res, next) {
		try {
			const accessLink = req.params.link;
			const userData = await userService.getAccess(accessLink);

			refreshTokenInCookie(res, userData);
			return res
				.json(userData)
				.redirect(`${process.env.CLIENT_URL}/profile/settings`); //TODO Добавить константы юрлов
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new UserController();
