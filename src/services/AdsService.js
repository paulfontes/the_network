import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Ad } from "@/models/Ad.js"
import { AppState } from "@/AppState.js"

class AdsService {
    async getAds() {
        const response = await api.get('api/ads')
        const ads = response.data.map(pojo => new Ad(pojo))
        AppState.ads = ads
    }

}

export const adsService = new AdsService()