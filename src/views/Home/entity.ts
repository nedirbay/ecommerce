import type { Product, Category } from '@/types'

// ─── Featured product shown on the hero/home section ──────────────────────────
export type FeaturedProduct = Pick<
    Product,
    'id' | 'title' | 'price' | 'discountPercentage' | 'rating' | 'thumbnail' | 'category'
>

// ─── Hero slide ───────────────────────────────────────────────────────────────
export interface HeroSlide {
    title: string
    subtitle: string
    cta: string
    to: string
    gradient: string
    emoji: string
}

export type { Product, Category }
