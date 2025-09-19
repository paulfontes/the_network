<script setup>
import { postsServices } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

const formData = ref({
    body: '',
    imgUrl: ''
})

async function createPost() {
    try {
        await postsServices.createPost(formData.value)
    }
    catch (error) {
        Pop.error(error);
        logger.log('There was a problem Creating a post!!', error)
    }
}

</script>


<template>
    <form @submit.prevent="createPost()" class="row " action="">
        <label for="post-body">What do you want to write!?</label>
        <div class="col-12">
            <textarea v-model="formData.body" class="w-100" type="text" name="post-body" id="post-body"></textarea>
        </div>
        <label for="post-img">Image</label>
        <div class="col-8">
            <input v-model="formData.imgUrl" class="w-100" type="url" maxlength="250" name="post-img" id="post-img">
        </div>
        <div class="col-4 text-end">
            <button class="btn btn-outline-primary" type="submit">Post to Page</button>
        </div>
    </form>
</template>


<style lang="scss" scoped></style>