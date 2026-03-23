import { AuthRepository } from './repository'
import type { AuthCredentials } from '@/types'

export const AuthService = {
    async login(credentials: AuthCredentials) {
        return AuthRepository.login(credentials)
    },

    // DummyJSON doesn't have real register — we simulate it locally
    async register(data: {
        username: string
        password: string
        firstName: string
        lastName: string
        email: string
    }) {
        // Attempt login with default test credentials to simulate auth flow
        // In a real app this would POST to /users/add
        return AuthRepository.login({
            username: data.username || 'emilys',
            password: data.password || 'emilyspass',
        })
    },
}
