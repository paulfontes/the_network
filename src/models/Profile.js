export class Profile {
    constructor(data) {
        this.id = data.id
        this.bio = data.bio
        this.class = data.class
        this.coverImg = data.coverImg
        this.createdAt = new Date(data.createdAt).toLocaleDateString
        this.updatedAt = new Date(data.updatedAt).toLocaleDateString
        this.github = data.github
        this.graduated = data.graduated
        this.linkedin = data.linkedin
        this.name = data.name
        this.picture = data.picture
        this.resume = data.resume

    }
}