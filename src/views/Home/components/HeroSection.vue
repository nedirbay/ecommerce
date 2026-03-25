<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import type { HeroSlide } from '../entity'

const props = defineProps<{
  heroSlides: HeroSlide[]
}>()

const router = useRouter()
const currentSlide = ref(0)
</script>

<template>
  <section class="hero" v-if="heroSlides && heroSlides.length > 0 && heroSlides[currentSlide]">
    <div
      class="hero-slide"
      :style="{ background: heroSlides[currentSlide]?.gradient }"
    >
      <!-- Background Image with Overlay -->
      <div class="hero-bg-image" :style="{ backgroundImage: `url(${heroSlides[currentSlide]?.image})` }"></div>
      <div class="hero-overlay"></div>

      <div class="container hero-content">
        <div class="hero-text">
          <div class="hero-badge animate-fade-in-down">
            <span class="badge-icon">✨</span>
            <span class="badge-text">Premium Selection</span>
          </div>
          <h1 class="hero-title animate-fade-in-up">
            {{ heroSlides[currentSlide]?.title.split(' ').slice(0, -1).join(' ') }}
            <span class="text-gradient">{{ heroSlides[currentSlide]?.title.split(' ').pop() }}</span>
          </h1>
          <p class="hero-subtitle animate-fade-in-up delay-1">
            {{ heroSlides[currentSlide]?.subtitle }}
          </p>
          <div class="hero-actions animate-fade-in-up delay-2">
            <el-button
              type="primary"
              size="large"
              class="hero-cta"
              @click="router.push(heroSlides[currentSlide]!.to)"
            >
              {{ heroSlides[currentSlide]?.cta }}
              <el-icon><ArrowRight /></el-icon>
            </el-button>
            <el-button size="large" class="hero-secondary" @click="router.push('/products')">
              Browse All
            </el-button>
          </div>
        </div>

        <div class="hero-visual animate-float-slow">
          <div class="visual-card glass">
            <img :src="heroSlides[currentSlide]?.image" :alt="heroSlides[currentSlide]?.title" class="visual-img" />
            <div class="visual-badge">{{ heroSlides[currentSlide]?.emoji }}</div>
          </div>
        </div>
      </div>

      <!-- Slide dots -->
      <div class="hero-dots">
        <button
          v-for="(_, i) in heroSlides"
          :key="i"
          class="dot"
          :class="{ active: currentSlide === i }"
          @click="currentSlide = i"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero { position: relative; overflow: hidden; }

.hero-slide {
  min-height: 560px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
}

.hero-bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(40px) saturate(1.5);
  opacity: 0.4;
  transform: scale(1.1);
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 20% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%);
  z-index: 1;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 40px;
  padding: 80px var(--container-padding);
  width: 100%;
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  padding: 6px 16px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 24px;
}

.badge-text { color: white; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }

.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; color: white; line-height: 1.1; margin-bottom: 20px; letter-spacing: -2px; }

.text-gradient { background: linear-gradient(to right, #fff, rgba(255,255,255,0.6)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }

.hero-subtitle { color: rgba(255,255,255,0.85); font-size: var(--font-size-xl); margin-bottom: 40px; line-height: 1.6; max-width: 500px; }

.hero-actions { display: flex; gap: 16px; }

.hero-cta {
  height: 56px !important;
  padding: 0 36px !important;
  font-size: 1.125rem !important;
  border-radius: 14px !important;
  background: white !important;
  color: var(--primary) !important;
  border: none !important;
  font-weight: 700 !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.hero-cta:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important; }

.hero-secondary {
  height: 56px !important;
  padding: 0 32px !important;
  font-size: 1.125rem !important;
  border-radius: 14px !important;
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(12px) !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.hero-secondary:hover { background: rgba(255, 255, 255, 0.2) !important; border-color: white !important; }

.hero-visual { display: flex; justify-content: center; align-items: center; }

.visual-card {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  border-radius: 32px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 30px 60px rgba(0,0,0,0.4);
}

.visual-img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }

.visual-badge {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  animation: bounce 3s infinite;
}

@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

.animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.animate-fade-in-down { animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }

@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }

.animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
@keyframes floatSlow { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(0, -20px); } }

.hero-dots { position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; gap: 12px; z-index: 10; }

.dot {
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255,255,255,0.2);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active { background: white; width: 60px; }
</style>
