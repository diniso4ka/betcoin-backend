const UserModel = require('../../../../enteties/User/models/user-model');
const BannedUserModel = require('../../../../enteties/User/models/banned-user-model');
const CommentModel = require('../../../../enteties/Comment/models/comment-model');
const PostModel = require('../../../../enteties/Blog/models/post-model');

const ApiError = require('../../../../exceptions/api-error');

const { ABSOLUTE_DELETE } = require('../../../../utils/constants/deleteTypes');

class ModeratorService {
	async deleteUser(userId, deleteType) {
		const candidate = await UserModel.findOne({ _id: userId });
		if (!candidate) {
			throw ApiError.BadRequest('Пользователь не найден');
		}

		const deletedUser = await UserModel.deleteOne({ _id: userId });

		if (deleteType === ABSOLUTE_DELETE) {
			const deletedComments = await CommentModel.deleteMany({ user: userId });
			const deletedPosts = await PostModel.deleteMany({ user: userId });

			return { deletedUser, deletedComments, deletedPosts };
		}
		return { deletedUser };
	}

	async banUser(userId, reason) {
		const candidate = await UserModel.findOne({ _id: userId });
		if (!candidate) {
			throw ApiError.BadRequest('Пользователь не найден');
		}

		const candidateIsBanned = await BannedUserModel.findOne({ user: userId });
		if (candidateIsBanned) {
			throw ApiError.BadRequest('Пользователь уже забанен');
		}

		const doc = new BannedUserModel({
			user: userId,
			reason: reason || '',
			email: candidate.email,
		});

		const user = await doc.save();

		candidate.isBanned = user._id;
		await candidate.save();

		return user;
	}
}

module.exports = new ModeratorService();
