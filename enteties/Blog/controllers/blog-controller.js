const blogService = require('./services/blog-service');

class BlogController {
	async getAllPosts(req, res, next) {
		try {
			const posts = await blogService.getAll();

			return res.json(posts);
		} catch (err) {
			next(err);
		}
	}

	async getOnePost(req, res, next) {
		try {
			const postId = req.params.postId;
			const { id } = req.user;
			const post = await blogService.getOne(postId, id);

			return res.json(post);
		} catch (err) {
			next(err);
		}
	}

	async createPost(req, res, next) {
		try {
			const { title, subtitle, img, tags, text } = req.body;
			const { id } = req.user;
			const post = await blogService.createPost(
				title,
				subtitle,
				img,
				tags,
				text,
				id,
			);

			return res.json(post);
		} catch (err) {
			next(err);
		}
	}

	async updatePost(req, res, next) {
		try {
			console.log('NONE');
		} catch (err) {
			next(err);
		}
	}

	async deletePost(req, res, next) {
		try {
			console.log('NONE');
		} catch (err) {
			next(err);
		}
	}

	async likePost(req, res, next) {
		try {
			const postId = req.params.postId;
			const { id } = req.user;
			await blogService.getOne(postId, id);
			const post = await blogService.likePost(postId, id);

			return res.json(post);
		} catch (err) {
			next(err);
		}
	}

	async reportPost(req, res, next) {
		try {
			console.log('NONE');
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new BlogController();
