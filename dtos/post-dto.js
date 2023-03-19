module.exports = class PostDto {
    title;
    subtitle;
    img;
    text;
    id;
    user;

    constructor(model) {
        this.title = model.title
        this.subtitle = model.subtitle
        this.img = model.img
        this.text = model.text
        this.id = model._id
        this.user = model.user
    }
}