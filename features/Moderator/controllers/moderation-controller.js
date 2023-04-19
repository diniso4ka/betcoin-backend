const moderatorService = require('./services/moderator-service');

class ModeratorController {
	async deleteUser(req, res, next) {
		try {
			const { userId, deleteType } = req.body;
			const deletedUser = await moderatorService.deleteUser(userId, deleteType);

			return res
				.status(200)
				.json({ message: 'Пользователь удален', deletedUser });
		} catch (err) {
			next(err);
		}
	}

	async banUser(req, res, next) {
		try {
			const { userId, reason } = req.body;
			const bannedUser = await moderatorService.banUser(userId, reason);

			return res
				.status(200)
				.json({ message: 'Пользователь забанен', bannedUser });
		} catch (err) {
			next(err);
		}
	}

	async deleteAndBanUser() {}

	async unBanUser() {}
}

module.exports = new ModeratorController();
