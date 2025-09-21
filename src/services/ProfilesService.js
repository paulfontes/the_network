import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Account } from "@/models/Account.js"
import { AppState } from "@/AppState.js"
import { Profile } from "@/models/Profile.js"

class ProfilesService {
    async getProfile(profileId) {
        AppState.activeProfile = null
        const response = await api.get(`api/profiles/${profileId}`)
        AppState.activeProfile = new Profile(response.data)
        logger.log(AppState.activeProfile)
    }

}

export const profilesService = new ProfilesService()