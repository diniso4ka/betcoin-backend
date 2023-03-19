const PostModel = require('../models/post-model')
const UserModel = require('../models/user-model')
const PostDto = require('../dtos/post-dto')
const ApiError = require('../exceptions/api-error')


class BlogService {
    async getAll(){
        const postsData =await PostModel.find()
        if(!postsData){
            throw ApiError.BadRequest(`Произошла ошибка`) //TODO status code
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
            throw ApiError.BadRequest('Пост не найден')
        }
        const hasView = await post.wasRead.find((id)=> id=== userId)

        if(hasView){
            return post
        }

       PostModel.findOneAndUpdate({_id: postId,},{$inc:{views: 1}, $push: {wasRead: userId}},{returnDocument: 'after'},
            (err,doc)=>{
            if(err){
                throw ApiError.BadRequest('Не удалось вернуть пост')
            }

            if(!doc){
                throw ApiError.BadRequest('Пост не найден')
            }

            return doc
            })

    }

    async likePost(userId, postId){
        const post = await PostModel.findById({_id: postId})
        const user = await UserModel.findById({_id: userId})
        let likesCount

        if(!post){
            throw ApiError.BadRequest('Не удалось вернуть пост')
        }
        const hasLiked = user.likedPosts.find((id)=> id=== postId)

        // Если у юзера в списке понравившихся постов найден пост из запроса, пост удаляется из списка, и кол-во лайков декрементируется на 1
        if(hasLiked){
           PostModel.findOneAndUpdate({_id: postId},{$inc:{likes: -1}},{returnDocument: 'after'},
                (err,doc)=>{
                    if(err){
                        throw ApiError.BadRequest('Не удалось вернуть пост')
                    }

                    if(!doc){
                        throw ApiError.BadRequest('Пост не найден')
                    }
                })
            const userWithoutThisPost = user.likedPosts.filter((post)=> post!== postId)

            UserModel.findOneAndUpdate({_id: userId},{$set: {likedPosts: userWithoutThisPost}},{returnDocument: 'after'},
                (err,doc)=>{
                    if(err){
                        throw ApiError.BadRequest('Не удалось вернуть пост')
                    }

                    if(!doc){
                        throw ApiError.BadRequest('Пост не найден')
                    }
                })
            likesCount = post.likes - 1
            return {postId ,likes: likesCount, isLiked: false}
        }

        // Если у юзера в списке понравившихся постов не найден пост из запроса, пост добавляется в  список, и кол-во лайков инкрементируется на 1
        PostModel.findOneAndUpdate({_id: postId,},{$inc:{likes: 1}, $push: {wasRead: userId}},{returnDocument: 'after'},
            (err,doc)=>{
            if(err){
                throw ApiError.BadRequest('Не удалось вернуть пост')
            }

            if(!doc){
                throw ApiError.BadRequest('Пост не найден')
            }
            })

       UserModel.findOneAndUpdate({_id: userId,},{$push:{likedPosts:postId},},{returnDocument: 'after'},
            (err,doc)=>{
                if(err){
                    throw ApiError.BadRequest('Не удалось поставить лайк')
                }

                if(!doc){
                    throw ApiError.BadRequest('Лайк не найден')
                }
            })
        likesCount = post.likes + 1
        return {postId ,likes: likesCount, isLiked: true}


    }

    async getPostFromDb(postId){
        const post = await PostModel.findOne({_id:postId})
        return new PostDto(post)
    }


}

module.exports = new BlogService()