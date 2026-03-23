import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/useAuthStore'
import { ProfileService } from './service'
import type { ProfileEditForm, OrderHistoryItem } from './entity'

export function useProfileViewModel() {
    const authStore = useAuthStore()
    const loading = ref(false)
    const editMode = ref(false)

    const form = ref<ProfileEditForm>({
        firstName: authStore.user?.firstName ?? '',
        lastName: authStore.user?.lastName ?? '',
        email: authStore.user?.email ?? '',
        phone: authStore.user?.phone ?? '',
    })

    // Mock order history (DummyJSON /carts/:userId could be used here)
    const orderHistory = ref<OrderHistoryItem[]>([
        { id: 1001, date: '2025-03-10', total: 124.99, status: 'delivered', itemCount: 3 },
        { id: 1002, date: '2025-03-18', total: 49.50, status: 'shipped', itemCount: 1 },
        { id: 1003, date: '2025-03-22', total: 89.00, status: 'processing', itemCount: 2 },
    ])

    async function saveProfile() {
        if (!authStore.user) return
        loading.value = true
        try {
            const updated = await ProfileService.updateUser(authStore.user.id, form.value)
            authStore.setUser(updated)
            ElMessage.success('Profile updated successfully!')
            editMode.value = false
        } catch {
            ElMessage.error('Failed to update profile.')
        } finally {
            loading.value = false
        }
    }

    return { form, loading, editMode, orderHistory, user: authStore.user, saveProfile }
}
