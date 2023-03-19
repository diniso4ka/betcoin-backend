const bcrypt = require('bcrypt')
const uuid = require('uuid')

const UserModel = require('../models/user-model')
const TokenModel = require('../models/token-model')

const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(email, username, password){
        const uniqueEmail = await UserModel.findOne({email})
        if(uniqueEmail){
            throw ApiError.BadRequest(400,`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const uniqueUsername = await UserModel.findOne({username})
        if(uniqueUsername){
            throw ApiError.BadRequest(400,`Пользователь с именем ${username} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink  = uuid.v4()
        const user = await UserModel.create({email, username, password: hashPassword, activationLink})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: {...userDto}
        }
    }

    async login(login, password){
        const loginByMail = await UserModel.findOne({email: login})
        const loginByUsername = await UserModel.findOne({username: login})
        let user
        if(loginByMail){
            user = loginByMail
        }
        if(loginByUsername){
            user = loginByUsername
        }
        if(!user){
            throw ApiError.BadRequest(400,'Пользователь не найден')
        }
        const isPassEquals = bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest(400,`Неверный пароль`)
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: {...userDto}
        }
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }


    async activate(activationLink){
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest(400,'Неккоректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if(!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError()
        }

        const user = UserModel.findOne(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: {...userDto}
        }
    }


}

module.exports = new UserService()