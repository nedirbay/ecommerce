<script setup lang="ts">
defineProps<{
  size?: 'small' | 'medium' | 'large'
  text?: string
}>()
</script>

<template>
  <div class="loading-spinner" :class="size ?? 'medium'">
    <div class="spinner" />
    <p v-if="text" class="spinner-text">{{ text }}</p>
  </div>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
}

.loading-spinner.small { padding: 24px; }
.loading-spinner.medium { padding: 48px; }
.loading-spinner.large { padding: 80px; }

.spinner {
  border-radius: var(--radius-full);
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  animation: spin 0.7s linear infinite;
}

.loading-spinner.small .spinner { width: 24px; height: 24px; }
.loading-spinner.medium .spinner { width: 40px; height: 40px; }
.loading-spinner.large .spinner { width: 56px; height: 56px; border-width: 4px; }

.spinner-text {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
