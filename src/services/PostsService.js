import { Post } from "@/models/Post.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { logger } from "@/utils/Logger.js"

class PostsServices {
    async getPosts() {
        const response = await api.get('api/posts')
        const posts = response.data.posts.map(pojo => new Post(pojo))
        AppState.posts = posts
    }

}

export const postsServices = new PostsServices()