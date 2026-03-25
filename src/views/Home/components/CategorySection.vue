<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import type { Category } from '@/types'

defineProps<{
  categories: Category[]
  categoryEmojis: Record<string, string>
}>()

const router = useRouter()
</script>

<template>
  <section class="section">
    <div class="container text-center mb-4" style="margin-bottom: 10px;">
      <h2 class="section-title text-center mx-auto mb-2">Shop by Category</h2>
      <p class="section-subtitle text-muted max-w-2xl mx-auto">Explore our wide range of premium collections.</p>
    </div>
    <div class="container container-sm">
      <div class="categories-grid">
        <RouterLink
          v-for="cat in categories"
          :key="cat.slug"
          :to="`/products?category=${cat.slug}`"
          class="category-card animate-grid-item"
        >
          <div class="card-inner">
            <div class="cat-visual">
              <span class="cat-emoji">{{ categoryEmojis[cat.slug] ?? '🏷️' }}</span>
              <div class="cat-glow"></div>
            </div>
            <h4 class="cat-name">{{ cat.name }}</h4>
            <div class="cat-arrow">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </RouterLink>
      </div>

      <div class="flex justify-center mt-12" style="margin-top: 15px;">
        <el-button size="large" @click="router.push('/products')" class="view-all-cats">
          Browse All Categories
          <el-icon class="ml-2"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section { padding: 56px 0; }
.section-title { font-size: var(--font-size-2xl); font-weight: 800; color: var(--text-primary); letter-spacing: -0.5px; margin-bottom: 28px; }
.text-center { text-align: center; }
.mx-auto { margin-left: auto; margin-right: auto; }
.max-w-2xl { max-width: 42rem; }
.section-subtitle { font-size: 1.125rem; line-height: 1.6; }
.container-sm { max-width: 1000px; }

.categories-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.category-card { text-decoration: none; perspective: 1000px; }
.card-inner {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.category-card:hover .card-inner {
  transform: translateY(-10px) rotateX(4deg);
  border-color: var(--primary);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  background: linear-gradient(180deg, var(--bg-surface) 0%, var(--primary-light-alpha, rgba(64, 158, 255, 0.05)) 100%);
}

.cat-visual {
  width: 80px; height: 80px; background: var(--bg-muted); border-radius: 20px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
  position: relative; transition: all 0.3s ease;
}

.category-card:hover .cat-visual { background: white; transform: scale(1.1); }
.cat-emoji { font-size: 2.5rem; z-index: 2; transition: transform 0.3s ease; }
.category-card:hover .cat-emoji { transform: rotate(10deg); }
.cat-glow { position: absolute; inset: -10px; background: var(--primary); filter: blur(30px); opacity: 0; transition: opacity 0.3s ease; border-radius: 50%; }
.category-card:hover .cat-glow { opacity: 0.15; }
.cat-name { font-size: 1.125rem; font-weight: 700; color: var(--text-primary); text-transform: capitalize; margin-bottom: 8px; letter-spacing: -0.2px; }
.cat-arrow { margin-top: auto; color: var(--primary); opacity: 0; transform: translateX(-10px); transition: all 0.3s ease; }
.category-card:hover .cat-arrow { opacity: 1; transform: translateX(0); }

.view-all-cats { border-radius: var(--radius-full) !important; font-weight: 600 !important; padding: 0 32px !important; transition: all 0.3s ease !important; }
.view-all-cats:hover { transform: scale(1.05); box-shadow: var(--shadow-md) !important; }

@media (max-width: 768px) {
  .categories-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
}
</style>
