import { ProfileRepository } from './repository'
import type { User } from '@/types'

export const ProfileService = {
    async getUser(id: number): Promise<User> {
        return ProfileRepository.getUser(id)
    },

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        return ProfileRepository.updateUser(id, data)
    },
}
