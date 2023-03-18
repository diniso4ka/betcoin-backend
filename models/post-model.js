const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    title: {type: String, required: true },
    subtitle: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    img: {type: String},
    views: {type: Number, default: 0},
    likes: {type: Number, default: 0},
    tags: {type: Array, default: []},
    text: {type: Array, required: true},
    wasRead: {type: Array, default: []},
}, {timestamps: true})

module.exports= model('Post', PostSchema)