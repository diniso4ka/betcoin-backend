const userService = require('../service/user-service');

class UserController {
	async registration(req, res, next) {
		try {
			const { email, username, password } = req.body;
			const userData = await userService.registration(
				email,
				username,
				password,
			);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (err) {
			next(err);
		}
	}

	async login(req, res, next) {
		try {
			const { login, password } = req.body;
			const userData = await userService.login(login, password);

			res.status(200).cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
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
			return res.status(200).json({ token });
		} catch (err) {
			next(err);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await userService.refresh(refreshToken);

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.status(200).json(userData);
		} catch (err) {
			next(err);
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await userService.activate(activationLink);

			return res.status(200).redirect(process.env.CLIENT_URL);
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
			const { email } = req.body;
			const userEmail = await userService.getAccessLink(email);

			return res.status(200).json(userEmail);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new UserController();
