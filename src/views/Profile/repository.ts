import { api } from '@/services/api'
import type { User } from '@/types'

export const ProfileRepository = {
    async getUser(id: number): Promise<User> {
        return api.get<User>(`/users/${id}`)
    },

    async updateUser(id: number, data: Partial<User>): Promise<User> {
        return api.put<User>(`/users/${id}`, data)
    },
}
