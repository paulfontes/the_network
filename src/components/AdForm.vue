<script setup>
import { AppState } from '@/AppState.js';
import { adsService } from '@/services/AdsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const ads = computed(() => AppState.ads)

onMounted(() => getAds())


async function getAds() {
    try {
        await adsService.getAds()
    }
    catch (error) {
        Pop.error(error);
        logger.log('There was a problem getting ads', error)
    }
}

</script>


<template>
    <section class="row justify-content-between">
        <div v-for="ad in ads" :key="ad.id" class="col-5">
            <img class="ad-img" :src="ad.square" alt="">
        </div>
    </section>
</template>


<style lang="scss" scoped>
.ad-img {
    width: 100%;
    ;
}
</style>