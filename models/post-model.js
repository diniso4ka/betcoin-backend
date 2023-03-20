const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    title: {type: String, required: true, unique: true },
    subtitle: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    img: {type: String},
    tags: {type: Array, default: []},
    text: {type: Array, required: true},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    viewUsers: {type: Array, default: []},
    likeUsers: {type: Array, default: []},
}, {timestamps: true})

module.exports= model('Post', PostSchema)