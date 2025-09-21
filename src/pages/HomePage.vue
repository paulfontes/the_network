<script setup>
import { AppState } from '@/AppState.js';
import { postsServices } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import PostTemplate from './PostTemplate.vue';
import SearchBar from '@/components/SearchBar.vue';
import BlogForm from '@/components/BlogForm.vue';
import AdForm from '@/components/AdForm.vue';

const posts = computed(() => AppState.posts)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)
const account = computed(() => AppState.account)

onMounted(() => getPosts())



async function getPosts() {
  try {
    await postsServices.getPosts()
  }
  catch (error) {
    Pop.error(error);
    logger.log('There was a problem getting the posts!', error)
  }
}

async function changePage(pageNumber) {
  try {

    if (AppState.searchTerm == '') {
      await postsServices.changePage(pageNumber)

    }
    else {
      await postsServices.changeSearchPage(pageNumber, AppState.searchTerm)
    }
  }
  catch (error) {
    Pop.error(error);
    logger.log('Could not change page!!', error)
  }
}

</script>



<template>
  <div class="container-fluid">
    <section class="row justify-content-evenly text-center mt-3">
      <AdForm />
    </section>
    <section class="justify-content-center row g-3 mt-3">
      <div class="col-9">
        <BlogForm v-if="account" />
      </div>
      <hr class="w-75">
      <SearchBar />
      <div class="col-9 d-flex justify-content-between align-items-center">
        <button @click="changePage(currentPage - 1)" class="btn btn-outline-success" :disabled="currentPage < 2">Newest
          Posts</button>
        <p>{{ currentPage }} of {{ totalPages }}</p>
        <button @click="changePage(currentPage + 1)" class="btn btn-outline-success"
          :disabled="currentPage == totalPages">Older Posts</button>
      </div>
      <PostTemplate v-for="post in posts" :key="post.id" :postProp="post" />
      <div class="col-9 d-flex justify-content-between align-items-center">
        <button @click="changePage(currentPage - 1)" class="btn btn-outline-success" :disabled="currentPage < 2">Newest
          Posts</button>
        <p>{{ currentPage }} of {{ totalPages }}</p>
        <button @click="changePage(currentPage + 1)" class="btn btn-outline-success"
          :disabled="currentPage == totalPages">Older Posts</button>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
