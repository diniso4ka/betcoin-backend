const Router = require('express').Router
const userController = require('../controllers/user-controller')
const blogController = require('../controllers/blog-controller')
const router = new Router()

// Авторизация
router.post('/auth/registration',userController.registration)
router.post('/auth/login',userController.login)
router.post('/auth/logout',userController.logout)
router.get('/auth/activate/:link',userController.activate)
router.get('/auth/refresh',userController.refresh)
router.get('/users',userController.getUsers)


// Блог
router.get('/blog/posts',blogController.getAllPosts)
router.get('/blog/:postId',blogController.getOnePost)
router.post('/blog/create',blogController.createPost)
router.delete('/blog/:postId',blogController.deletePost)
router.patch('/blog/:postId/update',blogController.updatePost)
router.patch('/blog/:postId',blogController.reportPost)
router.patch('/blog/:postId',blogController.likePost)


module.exports= router