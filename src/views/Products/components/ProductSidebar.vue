<script setup lang="ts">
import { Search, Close, Refresh, StarFilled } from '@element-plus/icons-vue'
import type { ProductFilters, Category, SortOption } from '../entity'

defineProps<{
  filters: ProductFilters
  categories: Category[]
  sortOptions: { label: string; value: SortOption }[]
}>()

const emit = defineEmits<{
  (e: 'update:filters', filters: Partial<ProductFilters>): void
  (e: 'reset'): void
}>()

function onPriceChange(val: number[]) {
  emit('update:filters', { minPrice: val[0], maxPrice: val[1] })
}
</script>

<template>
  <aside class="sidebar">
    <!-- Header with Reset -->
    <div class="sidebar-header flex justify-between items-center mb-6">
      <h3 class="sidebar-main-title">Filters</h3>
      <el-button link type="primary" :icon="Refresh" @click="emit('reset')">Reset</el-button>
    </div>

    <!-- Search -->
    <div class="sidebar-block">
      <h3 class="sidebar-title">Search</h3>
      <el-input
        :model-value="filters.search"
        placeholder="Product name..."
        :prefix-icon="Search"
        clearable
        @update:model-value="emit('update:filters', { search: $event as string })"
        @clear="emit('update:filters', { search: '' })"
      />
    </div>

    <!-- Sort -->
    <div class="sidebar-block">
      <h3 class="sidebar-title">Sort By</h3>
      <el-select
        :model-value="filters.sort"
        style="width: 100%"
        @update:model-value="emit('update:filters', { sort: $event as never })"
      >
        <el-option
          v-for="opt in sortOptions"
          :key="opt.value"
          :label="opt.label"
          :value="opt.value"
        />
      </el-select>
    </div>

    <!-- Category -->
    <div class="sidebar-block">
      <h3 class="sidebar-title">Categories</h3>
      <div class="category-list">
        <button
          class="cat-item"
          :class="{ active: !filters.category }"
          @click="emit('update:filters', { category: '' })"
        >
          All Categories
        </button>
        <button
          v-for="cat in categories"
          :key="cat.slug"
          class="cat-item"
          :class="{ active: filters.category === cat.slug }"
          @click="emit('update:filters', { category: cat.slug })"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- Price Range -->
    <div class="sidebar-block">
      <h3 class="sidebar-title">Price Range</h3>
      <div class="px-2">
        <el-slider
          :model-value="[filters.minPrice, filters.maxPrice]"
          range
          :min="0"
          :max="2000"
          :format-tooltip="(v: number) => `$${v}`"
          @update:model-value="onPriceChange($event as number[])"
        />
        <div class="flex justify-between text-xs text-muted mt-2">
          <span>${{ filters.minPrice }}</span>
          <span>${{ filters.maxPrice }}</span>
        </div>
      </div>
    </div>

    <!-- Rating -->
    <div class="sidebar-block">
      <h3 class="sidebar-title">Minimum Rating</h3>
      <div class="rating-filter">
        <el-rate
          :model-value="filters.rating"
          @update:model-value="emit('update:filters', { rating: $event as number })"
        />
        <span class="ml-2 text-xs text-muted" v-if="filters.rating > 0">& Up</span>
      </div>
    </div>

    <!-- Availability -->
    <div class="sidebar-block border-t pt-4 mt-2">
      <div class="flex justify-between items-center">
        <span class="sidebar-title m-0">In Stock Only</span>
        <el-switch
          :model-value="filters.onlyInStock"
          @update:model-value="emit('update:filters', { onlyInStock: $event as boolean })"
        />
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  padding: 24px;
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  box-shadow: var(--shadow-sm);
}

.sidebar-main-title { font-size: 18px; font-weight: 800; color: var(--text-primary); }
.sidebar-block { display: flex; flex-direction: column; gap: 12px; }
.sidebar-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 250px;
  overflow-y: auto;
  padding-right: 4px;
}

.category-list::-webkit-scrollbar { width: 4px; }
.category-list::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

.cat-item {
  text-align: left;
  padding: 8px 12px;
  border: none;
  background: none;
  border-radius: var(--radius-md);
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition);
  text-transform: capitalize;
}

.cat-item:hover { background: var(--bg-muted); color: var(--text-primary); }
.cat-item.active { background: var(--primary); color: white; font-weight: 600; }

.rating-filter { display: flex; align-items: center; }
.text-muted { color: var(--text-muted); }
.text-xs { font-size: 12px; }
.px-2 { padding-left: 8px; padding-right: 8px; }

@media (max-width: 1024px) {
  .sidebar { position: static; }
}
</style>
