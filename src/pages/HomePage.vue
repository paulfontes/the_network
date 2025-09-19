<script setup>
import { AppState } from '@/AppState.js';
import { postsServices } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.posts)

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

</script>



<template>
  <div class="container">
    <section class="row">

    </section>
  </div>
</template>

<style scoped lang="scss"></style>
