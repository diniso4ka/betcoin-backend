const ApiError = require('../exceptions/api-error')
const regex = require('../utils/regex/index')

module.exports = async function (req,res,next){
    try{
        const {email,username , password} = req.body
        if(!regex.mail.test(email)){
            return next(ApiError.BadRequest('Некорректная почта'))
        }
        if(!regex.username.test(username)){
            return next(ApiError.BadRequest('Некорректное пользовательское имя'))
        }
        if(!regex.password.test(password)){
            return next(ApiError.BadRequest('Некорректный пароль'))
        }
        next()
    }catch (err){
        return next(ApiError.BadRequest('Произошла ошибка'))
    }
}