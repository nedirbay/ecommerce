<script setup lang="ts">
import { Search, Filter } from '@element-plus/icons-vue'
import { useProductsViewModel } from './viewmodel'
import ProductCard from '@/components/shared/ProductCard.vue'
import LoadingSpinner from '@/components/shared/LoadingSpinner.vue'
import EmptyState from '@/components/shared/EmptyState.vue'

const {
  products,
  categories,
  total,
  loading,
  error,
  filters,
  totalPages,
  applyFilters,
  changePage,
} = useProductsViewModel()

const sortOptions = [
  { label: 'Top Rated', value: 'rating' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Biggest Discount', value: 'discountPercentage' },
  { label: 'Name A–Z', value: 'title' },
]
</script>

<template>
  <div class="products-page">
    <!-- Page Header -->
    <div class="page-header">
      <div class="container">
        <h1 class="page-title">
          {{ filters.search ? `Results for "${filters.search}"` : filters.category ? filters.category : 'All Products' }}
        </h1>
        <p class="page-meta">{{ total }} products found</p>
      </div>
    </div>

    <div class="container products-layout">
      <!-- ── Sidebar ── -->
      <aside class="sidebar">
        <!-- Search -->
        <div class="sidebar-block">
          <h3 class="sidebar-title">Search</h3>
          <el-input
            :model-value="filters.search"
            placeholder="Search products..."
            :prefix-icon="Search"
            clearable
            @update:model-value="applyFilters({ search: $event as string })"
            @clear="applyFilters({ search: '' })"
          />
        </div>

        <!-- Sort -->
        <div class="sidebar-block">
          <h3 class="sidebar-title">Sort By</h3>
          <el-select
            :model-value="filters.sort"
            style="width: 100%"
            @update:model-value="applyFilters({ sort: $event as never })"
          >
            <el-option
              v-for="opt in sortOptions"
              :key="opt.value"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </div>

        <!-- Categories -->
        <div class="sidebar-block">
          <h3 class="sidebar-title">Category</h3>
          <div class="category-list">
            <button
              class="cat-item"
              :class="{ active: !filters.category }"
              @click="applyFilters({ category: '' })"
            >
              All Categories
            </button>
            <button
              v-for="cat in categories"
              :key="cat.slug"
              class="cat-item"
              :class="{ active: filters.category === cat.slug }"
              @click="applyFilters({ category: cat.slug })"
            >
              {{ cat.name }}
            </button>
          </div>
        </div>
      </aside>

      <!-- ── Product Grid ── -->
      <div class="products-content">
        <LoadingSpinner v-if="loading" text="Loading products..." size="large" />

        <el-alert v-else-if="error" :title="error" type="error" :closable="false" />

        <EmptyState
          v-else-if="!products.length"
          icon="🔍"
          title="No products found"
          description="Try adjusting your search or filters to find what you're looking for."
        >
          <el-button type="primary" @click="applyFilters({ search: '', category: '' })">
            Clear Filters
          </el-button>
        </EmptyState>

        <template v-else>
          <div class="products-grid">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
          </div>

          <!-- Pagination -->
          <div class="pagination-wrapper">
            <el-pagination
              :current-page="filters.page"
              :page-count="totalPages"
              :total="total"
              :page-size="filters.pageSize"
              layout="prev, pager, next, jumper, total"
              background
              @current-change="changePage"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-page {
  min-height: 100vh;
}

/* Header */
.page-header {
  background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
  padding: 36px 0;
  margin-bottom: 40px;
}

.page-title {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  color: white;
  text-transform: capitalize;
}

.page-meta {
  color: rgba(255,255,255,0.7);
  font-size: var(--font-size-sm);
  margin-top: 4px;
}

/* Layout */
.products-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 32px;
  align-items: start;
  padding-bottom: 60px;
}

/* Sidebar */
.sidebar {
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  padding: 20px;
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-block { display: flex; flex-direction: column; gap: 10px; }

.sidebar-title {
  font-size: var(--font-size-sm);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 300px;
  overflow-y: auto;
}

.cat-item {
  text-align: left;
  padding: 8px 12px;
  border: none;
  background: none;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition);
  text-transform: capitalize;
}

.cat-item:hover { background: var(--bg-muted); color: var(--text-primary); }
.cat-item.active { background: var(--primary-light); color: var(--primary); font-weight: 600; }

/* Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  padding: 32px 0;
}

@media (max-width: 1024px) {
  .products-layout { grid-template-columns: 1fr; }
  .sidebar { position: static; }
  .products-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
