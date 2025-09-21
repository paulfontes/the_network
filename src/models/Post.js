export class Post {
    constructor(data) {
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creatorId = data.creatorId
        this.likeIds = data.likeIds
        this.id = data.id || data._id
        this.creator = data.creator
        this.likes = data.likes
        this.createdAt = new Date(data.createdAt).toLocaleDateString()
    }
}