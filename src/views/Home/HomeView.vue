<script setup lang="ts">
import { useHomeViewModel } from './viewmodel'
import HeroSection from './components/HeroSection.vue'
import StatsBar from './components/StatsBar.vue'
import CategorySection from './components/CategorySection.vue'
import FeaturedProducts from './components/FeaturedProducts.vue'
import DealsSection from './components/DealsSection.vue'
import PromoBanner from './components/PromoBanner.vue'

const { featuredProducts, categories, deals, heroSlides, loading } = useHomeViewModel()

const categoryEmojis: Record<string, string> = {
  beauty: '💄', fragrances: '🌸', furniture: '🛋️', groceries: '🛒',
  'home-decoration': '🏠', 'kitchen-accessories': '🍳', laptops: '💻',
  'mens-shirts': '👔', 'mens-shoes': '👟', 'mens-watches': '⌚',
  'mobile-accessories': '📱', motorcycle: '🏍️', 'skin-care': '🧴',
  smartphones: '📲', 'sports-accessories': '⚽', sunglasses: '🕶️',
  tablets: '📟', tops: '👕', vehicle: '🚗', 'womens-bags': '👜',
  'womens-dresses': '👗', 'womens-jewellery': '💍', 'womens-shoes': '👠',
  'womens-watches': '⌚',
}
</script>

<template>
  <div class="home-page">
    <HeroSection :hero-slides="heroSlides" />
    <StatsBar />
    <CategorySection :categories="categories" :category-emojis="categoryEmojis" />
    <FeaturedProducts :products="featuredProducts" :loading="loading" />
    <DealsSection :products="deals" :loading="loading" />
    <PromoBanner />
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
}

/* Base styles for global spacing if needed */
:deep(.section) {
  padding: 56px 0;
}
</style>
