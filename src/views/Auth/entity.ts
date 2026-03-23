import type { AuthCredentials, User } from '@/types'

export type AuthTab = 'login' | 'register'

export interface LoginForm {
    username: string
    password: string
}

export interface RegisterForm {
    firstName: string
    lastName: string
    email: string
    username: string
    password: string
    confirmPassword: string
}

export type { AuthCredentials, User }
