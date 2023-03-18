const blogService = require('../service/blog-service')
const {body} = require("express-validator");
const {Schema} = require("mongoose");

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
            const {postId, userId} = req.body
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
