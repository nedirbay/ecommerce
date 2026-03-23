import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(localStorage.getItem('auth_token'))

    // ─── Getters ───────────────────────────────────────────────────────────────
    const isLoggedIn = computed(() => !!token.value && !!user.value)

    const fullName = computed(() =>
        user.value ? `${user.value.firstName} ${user.value.lastName}` : '',
    )

    // ─── Actions ───────────────────────────────────────────────────────────────
    function setAuth(userData: User, authToken: string) {
        user.value = userData
        token.value = authToken
        localStorage.setItem('auth_token', authToken)
    }

    function setUser(userData: User) {
        user.value = userData
    }

    function logout() {
        user.value = null
        token.value = null
        localStorage.removeItem('auth_token')
    }

    return { user, token, isLoggedIn, fullName, setAuth, setUser, logout }
})
