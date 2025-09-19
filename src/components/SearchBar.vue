<script setup>
import { postsServices } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

const editableSearchTerm = ref('')

async function searchPosts() {
    try {
        await postsServices.searchPost(editableSearchTerm.value)
    }
    catch (error) {
        Pop.error(error);
        logger.log('There was an error while searching!', error)
    }
}


</script>


<template>
    <div class="col-12">
        <form @submit.prevent="searchPosts()">
            <label for="search-bar">Search for a Post</label>
            <div class="d-flex">
                <input v-model="editableSearchTerm" id="search-bar" class="form-control" type="text">
                <button class="btn btn-outline-orange" type="submit">Search</button>
            </div>
        </form>
    </div>
</template>


<style lang="scss" scoped></style>