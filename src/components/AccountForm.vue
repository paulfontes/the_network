<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
// import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
// import { Pop } from '@/utils/Pop.js';
import { computed, ref, watch } from 'vue';


const account = computed(() => AppState.account)





const formData = ref({
    picture: '',
    name: '',
    coverImg: '',
    linkedin: '',
    github: '',
    graduated: null,
    class: 'Fall 2025',
    bio: ''
})

watch(account, () => {
    logger.log(account.value);
    formData.value.name = account.value.name
    formData.value.picture = account.value.picture
    formData.value.coverImg = account.value.coverImg
    formData.value.linkedin = account.value.linkedin
    formData.value.github = account.value.github
    formData.value.graduated = account.value.graduated
    // formData.value.class = account.value.class
    formData.value.bio = account.value.bio
}, { immediate: true })

async function changeProfileSettings() {
    try {
        await accountService.changeProfileSettings(formData.value)
    }
    catch (error) {
        Pop.error(error);
        logger.log('There was an error changing your profile settings!', error)
    }
}

</script>


<template>
    <form @submit.prevent="changeProfileSettings()" class="row justify-content-center g-3 text-start">
        <div class="col-md-4">
            <label for="profile-name">Profile Name:</label>
            <input class="form-control" v-model="formData.name" type="text" id="profile-name" name="profile-name"
                maxlength="50">
        </div>
        <div class="col-md-4">
            <label for="profile-picture">Profile Picture URL:</label>
            <input class="form-control" v-model="formData.picture" type="url" id="profile-picture"
                name="profile-picture" maxlength="200">
        </div>
        <div class="col-md-4">
            <label for="profile-coverImg">Profile CoverImg URL:</label>
            <input class="form-control" v-model="formData.coverImg" type="url" id="profile-coverImg"
                name="profile-coverImg" maxlength="250">
        </div>
        <div class="col-md-4">
            <label for="profile-linkedin">Profile LinkedIn URL:</label>
            <input class="form-control" v-model="formData.linkedin" type="url" id="profile-linkedin"
                name="profile-linkedin" maxlength="250">
        </div>
        <div class="col-md-4">
            <label for="profile-github">Profile GitHub URL:</label>
            <input class="form-control" v-model="formData.github" type="url" id="profile-github" name="profile-github"
                maxlength="250">
        </div>
        <div class="col-md-4 ">
            <label for="profile-graduated">Did You Graduate?</label>
            <input class="m-3" v-model="formData.graduated" type="checkbox" id="profile-graduated"
                name="profile-graduated">
        </div>
        <div class="col-md-4">
            <label for="profile-class">What Year Did You Graduate?</label>
            <input class="form-control" v-model="formData.class" type="text" id="profile-class" name="profile-class">
        </div>
        <div class="col-md-10">
            <label for="profile-picture">Profile Bio:</label>
            <textarea class="w-100  form-control" v-model="formData.bio" type="text" id="profile-bio"
                name="profile-bio"></textarea>
        </div>
        <button class="w-25 form-control btn btn-outline-success" type="submit">Save</button>
    </form>
</template>


<style lang="scss" scoped></style>