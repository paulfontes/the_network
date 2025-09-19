import { api } from "./AxiosService.js"

class PostsServices {
    async getPosts() {
        const response = await api.get('api/posts')
        console.log(response.data);

    }

}

export const postsServices = new PostsServices()