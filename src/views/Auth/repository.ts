import { api } from '@/services/api'
import type { AuthCredentials, AuthResponse } from '@/types'

export const AuthRepository = {
    async login(credentials: AuthCredentials): Promise<AuthResponse> {
        return api.post<AuthResponse>('/auth/login', {
            username: credentials.username,
            password: credentials.password,
            expiresInMins: 60,
        })
    },

    async getMe(): Promise<AuthResponse> {
        return api.get<AuthResponse>('/auth/me')
    },
}
