<script setup>
import { AppState } from '@/AppState.js';
import { profilesService } from '@/services/ProfilesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const profile = computed(() => AppState.activeProfile)

onMounted(() => {
    getProfile()
})

const route = useRoute()

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

</script>


<template>
    <div class="container">
        <section v-if="profile" class="row">
            <div class="col-12 position-relative">
                <img class="profile-coverImg" :src="profile.coverImg" alt="">
            </div>
            <div class="profile-location">
                <img class="profile-picture" :src="profile.picture" alt="">
                <div class="col-1 text-center">
                    <h1>{{ profile.name }}</h1>
                    <section class="row">
                    </section>
                </div>
            </div>
            <div class="col-12">

            </div>
            <div class="col-12">

            </div>
            <div class="col-12">

            </div>
            <div class="col-12">
                {{ profile.bio }}
            </div>
        </section>
    </div>
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
    top: 500px;
    left: 870px;
}
</style>