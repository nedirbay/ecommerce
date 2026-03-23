import { ref, onMounted } from 'vue'
import { HomeService } from './service'
import type { Product, Category } from '@/types'
import type { HeroSlide } from './entity'

export function useHomeViewModel() {
    const featuredProducts = ref<Product[]>([])
    const categories = ref<Category[]>([])
    const deals = ref<Product[]>([])
    const loading = ref(true)
    const error = ref<string | null>(null)

    const heroSlides: HeroSlide[] = [
        {
            title: 'Signature Velvet Cakes',
            subtitle: 'Experience the masterpiece of texture and flavor.',
            cta: 'Order a Cake',
            to: '/products',
            gradient: 'linear-gradient(135deg, #be185d 0%, #db2777 100%)',
            emoji: '🎂',
        },
        {
            title: 'Fresh Daily Pastries',
            subtitle: 'Buttery, flaky, and baked fresh every morning.',
            cta: 'Browse Gallery',
            to: '/products',
            gradient: 'linear-gradient(135deg, #92400e 0%, #d97706 100%)',
            emoji: '🥐',
        },
        {
            title: 'Wedding & Celebrations',
            subtitle: 'Making your special moments even sweeter.',
            cta: 'Consultation',
            to: '/products',
            gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            emoji: '💍',
        },
    ]

    async function loadData() {
        loading.value = true
        error.value = null
        try {
            const [products, cats, dealItems] = await Promise.all([
                HomeService.getFeaturedProducts(),
                HomeService.getTopCategories(),
                HomeService.getDeals(),
            ])
            featuredProducts.value = products
            categories.value = cats
            deals.value = dealItems
        } catch (e) {
            error.value = 'Failed to load content. Please refresh the page.'
        } finally {
            loading.value = false
        }
    }

    onMounted(loadData)

    return { featuredProducts, categories, deals, heroSlides, loading, error }
}
