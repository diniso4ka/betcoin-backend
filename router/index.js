const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = new Router()

router.post('/registration',userController.registration)
router.post('/auth/login',userController.login)
router.post('/auth/logout',userController.logout)
router.get('/auth/activate/:link',userController.activate)
router.get('/auth/refresh',userController.refresh)
router.get('/users',userController.getUsers)

module.exports= router