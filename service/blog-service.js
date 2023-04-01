const PostModel = require('../models/post-model');
const PostDto = require('../dtos/post-dto');
const ApiError = require('../exceptions/api-error');

class BlogService {
	async getAll() {
		const postsData = await PostModel.find();
		if (!postsData) {
			throw ApiError.BadRequest('Произошла ошибка'); //TODO status code
		}
		return postsData;
	}

	async createPost(title, subtitle, img, tags, text, userId) {
		const doc = new PostModel({
			title,
			subtitle,
			text,
			tags,
			img,
			user: userId,
		});
		const post = await doc.save();
		return post;
	}

	async getOne(postId, userId) {
		const post = await PostModel.findOne({ _id: postId });
		if (!post) {
			throw ApiError.BadRequest('Пост не найден');
		}
		const hasView = await post.viewUsers.find((id) => id === userId);

		if (hasView) {
			return post;
		}

		PostModel.findOneAndUpdate(
			{ _id: postId },
			{ $inc: { views: 1 }, $push: { viewUsers: userId } },
			{ returnDocument: 'after' },
			(err, doc) => {
				if (err) {
					throw ApiError.BadRequest('Не удалось вернуть пост');
				}

				if (!doc) {
					throw ApiError.BadRequest('Пост не найден');
				}

				return doc;
			},
		);
		const updatedPost = await PostModel.findOne({ _id: postId });
		return updatedPost;
	}

	async likePost(postId, user) {
		const post = await PostModel.findById({ _id: postId });

		if (!post) {
			throw ApiError.BadRequest('Не удалось вернуть пост');
		}
		const hasLiked = post.likeUsers.find((id) => id === user.id);

		// Если у поста в списке лайкнувших юзеров найден юзер из запроса, юзер удаляется из списка, и кол-во лайков декрементируется на 1
		if (hasLiked) {
			const postLikesFilter = post.likeUsers.filter(
				(users) => users !== user.id,
			);
			PostModel.findOneAndUpdate(
				{ _id: postId },
				{ $inc: { likes: -1 }, $set: { likeUsers: postLikesFilter } },
				{ returnDocument: 'after' },
				(err, doc) => {
					if (err) {
						throw ApiError.BadRequest('Не удалось вернуть пост');
					}

					if (!doc) {
						throw ApiError.BadRequest('Пост не найден');
					}
					return doc;
				},
			);

			post.likeUsers = postLikesFilter;
			post.likes = post.likes - 1;
			return post;
		}

		// Если у поста в списке лайкнувших юзеров не найден юзер из запроса, юзер добавляется в список, и кол-во лайков инкрементируется на 1
		PostModel.findOneAndUpdate(
			{ _id: postId },
			{ $inc: { likes: 1 }, $push: { likeUsers: user.id } },
			{ returnDocument: 'after' },
			(err, doc) => {
				if (err) {
					throw ApiError.BadRequest('Не удалось вернуть пост');
				}

				if (!doc) {
					throw ApiError.BadRequest('Пост не найден');
				}
				return doc;
			},
		);

		post.likeUsers = [...post.likeUsers, user.id];
		post.likes = post.likes + 1;
		return post;
	}

	async getPostFromDb(postId) {
		const post = await PostModel.findOne({ _id: postId });
		return new PostDto(post);
	}
}

module.exports = new BlogService();
