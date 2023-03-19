const blogService = require('../service/blog-service')


class BlogController {
    async getAllPosts(req, res, next){
        try{
           const posts= await  blogService.getAll()

           return  res.json(posts)
        } catch (err){
            next(err)
        }
    }

    async getOnePost(req, res, next){
        try{
            console.log(req.user)
            const {userId} = req.body
            const postId = req.params.postId
            const post = await blogService.getOne(postId, userId)

            return res.json(post)
        } catch (err){
            next(err)
        }
    }

    async createPost(req, res, next){
        try{
            const {title, subtitle, user, img, tags, text} = req.body

            const post = await blogService.createPost(title, subtitle, user, img, tags, text)

            return res.json(post)
        } catch (err){
            next(err)
        }
    }

    async updatePost(req, res, next){
        try{

        } catch (err){
            next(err)
        }
    }

    async deletePost(req, res, next){
        try{

        } catch (err){
            next(err)
        }
    }

    async likePost(req, res, next){
        try{
            const {userId} = req.body
            const postId = req.params.postId
            await blogService.getOne(postId, userId)
            const post = await blogService.likePost(userId,postId)

            return res.json(post)
        } catch (err){
            next(err)
        }
    }

    async reportPost(req, res, next){
        try{

        } catch (err){
            next(err)
        }
    }
}

module.exports = new BlogController()
