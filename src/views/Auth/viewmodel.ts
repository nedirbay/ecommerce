import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthService } from './service'
import type { AuthTab, LoginForm, RegisterForm } from './entity'

export function useAuthViewModel() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()

    const activeTab = ref<AuthTab>('login')
    const loading = ref(false)

    const loginForm = ref<LoginForm>({ username: '', password: '' })
    const registerForm = ref<RegisterForm>({
        firstName: '', lastName: '', email: '',
        username: '', password: '', confirmPassword: '',
    })

    async function handleLogin() {
        if (!loginForm.value.username || !loginForm.value.password) {
            ElMessage.warning('Please enter your username and password.')
            return
        }
        loading.value = true
        try {
            const res = await AuthService.login(loginForm.value)
            authStore.setAuth(res, res.token)
            ElMessage.success(`Welcome back, ${res.firstName}!`)
            const redirect = route.query.redirect as string
            router.push(redirect ?? '/')
        } catch {
            ElMessage.error('Invalid username or password. Try: emilys / emilyspass')
        } finally {
            loading.value = false
        }
    }

    async function handleRegister() {
        if (registerForm.value.password !== registerForm.value.confirmPassword) {
            ElMessage.error('Passwords do not match.')
            return
        }
        loading.value = true
        try {
            const res = await AuthService.register(registerForm.value)
            authStore.setAuth(res, res.token)
            ElMessage.success('Account created successfully!')
            router.push('/')
        } catch {
            ElMessage.error('Registration failed. Please try again.')
        } finally {
            loading.value = false
        }
    }

    return { activeTab, loading, loginForm, registerForm, handleLogin, handleRegister }
}
