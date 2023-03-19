const blogService = require('../service/blog-service')
const ApiError = require('../exceptions/api-error')
const { } = require('mongoose')

module.exports = async function (req,res,next){
    try{
        const postId =req.params.postId
        const userId = req.user.id
        const post = await blogService.getPostFromDb(postId)
        if(!post){
            return next(ApiError.BadRequest('Пост не найден'))
        }

        if(post.user.toString() !== userId){
            return next(ApiError.BadRequest('Недостаточно прав'))
        }
        next()
    }catch (err){

    }
}