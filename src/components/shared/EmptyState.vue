<script setup lang="ts">
defineProps<{
  icon?: string
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon">{{ icon ?? '📭' }}</div>
    <h3 class="empty-title">{{ title ?? 'Nothing here yet' }}</h3>
    <p class="empty-desc">{{ description ?? 'No items found.' }}</p>
    <slot />
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  filter: grayscale(0.3);
}

.empty-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.empty-desc {
  font-size: var(--font-size-sm);
  color: var(--text-muted);
  max-width: 320px;
  line-height: 1.6;
  margin-bottom: 24px;
}
</style>
