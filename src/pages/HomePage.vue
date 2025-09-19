<script setup>
import { AppState } from '@/AppState.js';
import { postsServices } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import PostTemplate from './PostTemplate.vue';

const posts = computed(() => AppState.posts)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

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
    await postsServices.changePage(pageNumber)
  }
  catch (error) {
    Pop.error(error);
    logger.log('Could not change page!!', error)
  }
}

</script>



<template>
  <div class="container">
    <section class="row g-3 mt-3">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <button @click="changePage(currentPage - 1)" class="btn btn-outline-success">Newest Posts</button>
        <p>{{ currentPage }} of {{ totalPages }}</p>
        <button @click="changePage(currentPage + 1)" class="btn btn-outline-success">Older Posts</button>
      </div>
      <PostTemplate v-for="post in posts" :key="post.id" :postProp="post" />
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
