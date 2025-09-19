<script setup>
import { Post } from '@/models/Post.js';




defineProps({
    postProp: { type: Post, required: true }
})

</script>


<template>
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <p>{{ postProp.body }}</p>
                <hr>
                <div v-if="postProp.imgUrl" class="mb-4">
                    <img class="post-img" :src="postProp.imgUrl" alt="">
                </div>
                <div class="text-end ">
                    <img class="profile-img" :src="postProp.creator.picture" alt="">
                    <p class="mb-0">{{ postProp.creator.name }}</p>
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