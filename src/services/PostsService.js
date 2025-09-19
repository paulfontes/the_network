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

    handlePostResponse(response) {
        const posts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = posts
        AppState.currentPage = response.data.page
        AppState.totalPages = response.data.totalPages
    }

}

export const postsServices = new PostsServices()