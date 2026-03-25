<script setup lang="ts">
import { useProductsViewModel } from './viewmodel'
import ProductSidebar from './components/ProductSidebar.vue'
import ProductGrid from './components/ProductGrid.vue'
import type { SortOption } from './entity'

const {
  products,
  categories,
  total,
  loading,
  error,
  filters,
  totalPages,
  applyFilters,
  resetFilters,
  changePage,
} = useProductsViewModel()

const sortOptions: { label: string; value: SortOption }[] = [
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
      <div class="container header-container">
        <div>
          <h1 class="page-title">
            {{ filters.search ? `Results for "${filters.search}"` : filters.category ? filters.category : 'All Products' }}
          </h1>
          <p class="page-meta">{{ total }} products found</p>
        </div>
        <div class="breadcrumb text-white/60 text-sm hidden md:block">
          Home / Products {{ filters.category ? `/ ${filters.category}` : '' }}
        </div>
      </div>
    </div>

    <div class="container products-layout">
      <!-- Sidebar Component -->
      <ProductSidebar
        :filters="filters"
        :categories="categories"
        :sort-options="sortOptions"
        @update:filters="applyFilters"
        @reset="resetFilters"
      />

      <!-- Grid Component -->
      <div class="products-content">
        <ProductGrid
          :products="products"
          :loading="loading"
          :error="error"
          :total="total"
          :page="filters.page"
          :page-size="filters.pageSize"
          :total-pages="totalPages"
          @change-page="changePage"
          @clear-filters="resetFilters"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.products-page { min-height: 100vh; background: var(--bg-background); }

/* Header */
.page-header {
  background: linear-gradient(135deg, var(--primary) 0%, #7c3aed 100%);
  padding: 48px 0;
  margin-bottom: 48px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.header-container { display: flex; justify-content: space-between; align-items: flex-end; }

.page-title {
  font-size: 32px;
  font-weight: 800;
  color: white;
  text-transform: capitalize;
  letter-spacing: -0.5px;
}

.page-meta {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  margin-top: 8px;
}

/* Layout */
.products-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  align-items: start;
  padding-bottom: 80px;
}

.products-content { width: 100%; }

@media (max-width: 1024px) {
  .products-layout { grid-template-columns: 1fr; gap: 32px; }
  .page-header { padding: 32px 0; margin-bottom: 32px; }
  .page-title { font-size: 24px; }
}
</style>
