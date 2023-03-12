const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')

class UserService {
    async registration(email, username, password){
        const uniqueEmail = await UserModel.findOne({email})
        if(uniqueEmail){
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const uniqueUsername = await UserModel.findOne({username})
        if(uniqueUsername){
            throw new Error(`Пользователь с именем ${username} уже существует`)
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


    async activate(activationLink){
        const user = await UserModel.findOne({activationLink})
        if(!user){
            throw new Error('Неккоректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }


}

module.exports = new UserService()