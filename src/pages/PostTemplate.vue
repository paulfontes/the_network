<script setup>
import { AppState } from '@/AppState.js';
import { Post } from '@/models/Post.js';
import { computed } from 'vue';


const profile = computed(() => AppState.activeProfile)

const props = defineProps({
    postProp: { type: Post, required: true }
})

</script>


<template>
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <p>{{ postProp.body }}</p>
                <hr>
                <div>
                    <div v-if="postProp.imgUrl" class="mb-4">
                        <img class="post-img" :src="postProp.imgUrl" alt="">
                    </div>
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