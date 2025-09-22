<script setup>
import { AppState } from '@/AppState.js';
import { postsServices } from '@/services/PostsService.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import PostTemplate from './PostTemplate.vue';
import AdForm from '@/components/AdForm.vue';

const profile = computed(() => AppState.activeProfile)
const posts = computed(() => AppState.profilePosts)

const route = useRoute()

onMounted(() => {
    getProfile()
    getPostsByProfile()
})


watch(route, () => {
    getProfile()
    getPostsByProfile()
})

async function getProfile() {
    try {
        const profileId = route.params.profileId
        await profilesService.getProfile(profileId)
    }
    catch (error) {
        Pop.error(error);
        logger.log('Could not get profile!', error)
    }
}

async function getPostsByProfile() {
    try {
        await postsServices.getPostsByProfileId(route.params.profileId)
    }
    catch (error) {
        Pop.error(error);
        logger.log('There was an error getting posts!', error)
    }
}

</script>


<template>
    <section v-if="profile" class="row justify-content-center">
        <div class="col-2 d-flex">
            <AdForm />
        </div>
        <div class="col-md-8 ">
            <img class="profile-coverImg" :src="profile.coverImg" alt="">
        </div>
        <div class="col-2 d-flex">
            <AdForm />
        </div>
        <div class="profile-location text-center justify-content-center">
            <img class="profile-picture" :src="profile.picture" alt="">
            <div>
                <h5>{{ profile.name }}</h5>
            </div>
        </div>
        <div class="col-12 text-center mt-5">
            <p>{{ profile.bio }}</p>
        </div>
        <div class="col-3 text-center">
            {{ profile.class }}
        </div>
        <div class="col-3 text-center fs-5">
            <a v-if="profile.github" :href="profile.github"><i class="mdi mdi-github"></i></a>
            <a v-if="profile.linkedin" :href="profile.linkedin"><i class="mdi mdi-linkedin"></i></a>
        </div>
        <div v-if="profile.graduated" title="graduated" class="col-3 text-center">
            <i class="mdi mdi-check"></i>
        </div>
        <div class="col-12 text-center mt-5">
            <h3><em>Past Posts Newest to Oldest</em></h3>
        </div>
        <section class="row justify-content-center g-3 mt-3">
            <PostTemplate v-for="post in posts" :key="post.id" :postProp="post" />
        </section>
    </section>

</template>


<style lang="scss" scoped>
.profile-coverImg {
    width: 100%;
    height: 500px;
    object-fit: fill;
    aspect-ratio: 1/1;
    object-position: center;
}

.profile-picture {
    width: 8%;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1/1;
    border-radius: 50%;


}

.profile-location {
    position: absolute;
    top: 370px;
    text-shadow: 2px 2px 2px black;
}
</style>