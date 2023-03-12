const userService = require('../service/user-service')

class UserController {

    async registration( req, res, next){
        try {
            const {email, username, password} = req.body
            const userData = await userService.registration(email, username, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (err){
            next(err)
        }
    }

    async login(req, res, next){
        try {
            const {login, password}= req.body
            const userData = await userService.login(login, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (err){
            next(err)
        }
    }

    async logout(req, res, next){
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json({token})
        }catch (err){
            next(err)
        }
    }

    async refresh(req, res, next){
        try {

        }catch (err){
            next(err)
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        }catch (err){
            next(err)
        }
    }

    async getUsers(req, res, next){
        try {
            res.json(['123','345'])
        }catch (err){
            next(err)
        }
    }
}

module.exports = new UserController()