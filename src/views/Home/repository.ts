import type { Product, Category } from '@/types'
import { MOCK_PASTRIES, MOCK_CATEGORIES } from '@/services/mockData'

export const HomeRepository = {
    async getFeaturedProducts(): Promise<Product[]> {
        return MOCK_PASTRIES.slice(0, 8)
    },

    async getTopCategories(): Promise<Category[]> {
        return MOCK_CATEGORIES
    },

    async getDeals(): Promise<Product[]> {
        return MOCK_PASTRIES.filter(p => p.discountPercentage > 0)
    },
}
