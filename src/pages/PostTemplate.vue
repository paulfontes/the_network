<script setup>
import { AppState } from '@/AppState.js';
import { Post } from '@/models/Post.js';
import { postsServices } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const profile = computed(() => AppState.activeProfile)
const account = computed(() => AppState.account)
const posts = computed(() => AppState.posts)

const props = defineProps({
    postProp: { type: Post, required: true }
})

const numOfLikes = computed(() => props.postProp?.likes?.length || 0)

async function deletePost() {
    try {
        const confirmed = await Pop.confirm(
            `Are you sure you want to delete your Post?`,
            'It will be gone forever',
            'Yes',
            'No do not!'
        )

        if (!confirmed) {
            return
        }
        await postsServices.deletePost(props.postProp.id)
    }
    catch (error) {
        Pop.error(error);
        logger.log('There was an error deleting the post', error)
    }
}

async function likePost() {
    await postsServices.likePost(props.postProp.id)
}



</script>


<template>
    <div class="col-9 mt-3">
        <div class="card d-flex justify-content-center">
            <div class="card-body">
                <p>{{ postProp.body }}</p>
                <hr>
                <div>
                    <div v-if="postProp.imgUrl" class="mb-4">
                        <img class="post-img" :src="postProp.imgUrl" alt="">
                    </div>
                    <div>
                        <p>Posted On: {{ postProp.createdAt }}</p>
                    </div>
                    <div>
                        <button v-if="postProp.creatorId == account?.id" @click="deletePost()"
                            class="btn btn-outline-danger">Delete Post</button>
                    </div>
                    <div class="text-center">
                        <p>Likes: {{ numOfLikes }}</p>
                    </div>
                    <div class="text-center">
                        <button @click="likePost()" class="btn btn-outline-primary"><i
                                class="mdi mdi-heart"></i></button>
                    </div>
                    <!-- <div v-for="like in postProp.likes.options" :key="postProp.likes.options.localField"
                        class="text-center">
                        {{ like }}
                    </div> -->
                    <div class="text-end ">
                        <RouterLink :to="{ name: 'Profile', params: { profileId: postProp.creator.id } }">
                            <img class="profile-img" :src="postProp.creator.picture" alt="">
                            <p class="mb-0">{{ postProp.creator.name }}</p>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.profile-img {
    width: 8%;
    aspect-ratio: 1/1;
    border-radius: 50%;
}

.post-img {
    width: 100%;
    height: 400px;
    object-fit: contain;
    object-position: center;
    aspect-ratio: 1/1;
}
</style>