import { Post } from "@/models/Post.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

class PostsServices {
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

    handlePostResponse(response) {
        const posts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = posts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

}

export const postsServices = new PostsServices()