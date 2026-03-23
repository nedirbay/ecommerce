<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthRepository } from '@/views/Auth/repository'

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.token && !authStore.user) {
    try {
      const user = await AuthRepository.getMe()
      authStore.setUser(user)
    } catch {
      authStore.logout()
    }
  }
})
</script>

<template>
  <AppHeader />
  <main class="page-wrapper">
    <RouterView />
  </main>
  <AppFooter />
</template>
