import { Post } from "@/models/Post.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"
import { Profile } from "@/models/Profile.js"

class PostsServices {
    async getPostsByProfileId(profileId) {
        AppState.profilePosts = []
        const response = await api.get(`api/posts?creatorId=${profileId}`)
        logger.log(response.data)
        const posts = response.data.posts.map(pojo => new Post(pojo))
        AppState.profilePosts = posts
    }
    async getPosts() {
        const response = await api.get('api/posts')
        this.handlePostResponse(response)
    }
    async changePage(pageNumber) {
        const response = await api.get(`api/posts?page=${pageNumber}`)
        this.handlePostResponse(response)

    }
    async changeSearchPage(pageNumber, searchTerm) {
        const response = await api.get(`api/posts?query=${searchTerm}&page=${pageNumber}`)
        this.handlePostResponse(response)
    }
    async searchPost(searchTerm) {
        const response = await api.get(`api/posts?query=${searchTerm}`)
        logger.log('searched posts!!', response.data)
        this.handlePostResponse(response)
        AppState.searchTerm = searchTerm
    }
    async createPost(formData) {
        const response = await api.post('api/posts', formData)
        const post = new Post(response.data)
        AppState.posts.unshift(post)

    }

    async deletePost(postId) {
        const response = await api.delete(`api/posts/${postId}`)
        const index = AppState.posts.findIndex(post => post.id == postId)
        AppState.posts.splice(index, 1)
    }
    async likePost(postId) {
        const response = await api.post(`api/posts/${postId}/like`)
        logger.log('likes', response.data)
        // Server should return the updated post. Replace the post in AppState.posts so Vue reactivity updates the UI.
        const updatedPost = new Post(response.data)
        const index = AppState.posts.findIndex(p => p.id == postId)
        if (index !== -1) {
            // replace to keep reactivity
            AppState.posts.splice(index, 1, updatedPost)
        }
        // also update profilePosts if present
        const pIndex = AppState.profilePosts.findIndex(p => p.id == postId)
        if (pIndex !== -1) {
            AppState.profilePosts.splice(pIndex, 1, updatedPost)
        }

    }
    handlePostResponse(response) {
        const posts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = posts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

}

export const postsServices = new PostsServices()