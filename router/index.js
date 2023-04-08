const Router = require('express').Router;

const userController = require('../enteties/User/controllers/user-controller');
const blogController = require('../enteties/Blog/controllers/blog-controller');
const commentController = require('../enteties/Comment/controllers/comment-controller');

const authMiddleware = require('../middlewares/auth-middleware');
const authorMiddleware = require('../middlewares/author-middleware');
const activatedMiddleware = require('../middlewares/activated-middleware');
const registerValidation = require('../middlewares/registerValidation-middleware');

const router = new Router();

// Авторизация
router.post(
	'/auth/registration',
	registerValidation,
	userController.registration,
);
router.post('/auth/login', userController.login);
router.post('/auth/logout', userController.logout);
router.get('/auth/activate/:link', userController.activate);
router.get('/auth/refresh', userController.refresh);
router.get('/auth/accesslink/:link', userController.getAccess);
router.post('/auth/access', userController.getAccessLink);

// Блог
router.get('/blog/posts', blogController.getAllPosts);
router.get('/blog/:postId', authMiddleware, blogController.getOnePost);
router.post(
	'/blog/create',
	authMiddleware,
	activatedMiddleware,
	blogController.createPost,
);
router.delete(
	'/blog/:postId',
	authMiddleware,
	activatedMiddleware,
	authorMiddleware,
	blogController.deletePost,
);
router.patch(
	'/blog/:postId/update',
	authMiddleware,
	activatedMiddleware,
	authorMiddleware,
	blogController.updatePost,
);
router.patch(
	'/blog/report/:postId',
	authMiddleware,
	activatedMiddleware,
	blogController.reportPost,
);
router.patch(
	'/blog/like/:postId',
	authMiddleware,
	activatedMiddleware,
	blogController.likePost,
);

//Комментарии
router.get('/blog/:postId/comments', commentController.getAllComments);
router.post(
	'/blog/:postId/comment',
	authMiddleware,
	activatedMiddleware,
	commentController.createComment,
);
router.patch(
	'/blog/:postId/comment',
	authMiddleware,
	activatedMiddleware,
	commentController.likeComment,
);

module.exports = router;
