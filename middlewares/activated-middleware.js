const ApiError = require('../exceptions/api-error')

module.exports = async function (req,res,next){
    try{
        const userIsActivated = req.user.isActivated
        if(!userIsActivated){
            return next(ApiError.Forbidden())
        }

        next()
    }catch (err){
        return next(ApiError.Forbidden())
    }
}