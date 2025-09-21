<script setup>
import { adsService } from '@/services/AdsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';



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
    This is where ads will go
</template>


<style lang="scss" scoped></style>