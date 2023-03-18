const PostModel = require('../models/post-model')
const ApiError = require('../exceptions/api-error')


class BlogService {
    async getAll(){
        const postsData =await PostModel.find()
        if(!postsData){
            throw ApiError.BadRequest(400,`Произошла ошибка`) //TODO status code
        }
        return postsData
    }

    async createPost(title, subtitle, user, img, tags, text){
        const doc = new PostModel({
            title,
            subtitle,
            text,
            tags,
            img,
            user
        })
        const post = await doc.save()
        return post
    }

    async getOne(postId, userId){
        const post = await PostModel.findOne({_id: postId})
        if(!post){
            throw ApiError.BadRequest(400,`Произошла ошибка`) //TODO status code
        }
        const hasView = await post.wasRead.find((id)=> id=== userId)

        if(hasView){
            return post
        }

        const updatedPost = await PostModel.findOneAndUpdate({},{$inc:{views: 1}, $push: {wasRead: userId}}) //TODO Доделать
        return updatedPost
    }
}

module.exports = new BlogService()