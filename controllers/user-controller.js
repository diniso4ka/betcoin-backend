const userService = require('../service/user-service')

class UserController {

    async registration( req, res, next){
        try {
            const {email, username, password} = req.body
            const userData = await userService.registration(email, username, password)

            res.cookies('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (err){
            console.log(err)
        }
    }

    async login( req, res, next){
        try {

        }catch (err){

        }
    }

    async logout( req, res, next){
        try {

        }catch (err){

        }
    }

    async refresh( req, res, next){
        try {

        }catch (err){

        }
    }

    async activate( req, res, next){
        try {

        }catch (err){

        }
    }

    async getUsers( req, res, next){
        try {
            res.json(['123','345'])
        }catch (err){

        }
    }
}

module.exports = new UserController()