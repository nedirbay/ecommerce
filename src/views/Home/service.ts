import { HomeRepository } from './repository'
import type { Product, Category } from '@/types'

export const HomeService = {
    async getFeaturedProducts(): Promise<Product[]> {
        const products = await HomeRepository.getFeaturedProducts()
        // Sort by rating descending
        return products.sort((a, b) => b.rating - a.rating)
    },

    async getTopCategories(): Promise<Category[]> {
        const all = await HomeRepository.getTopCategories()
        // Return first 8 categories
        return all.slice(0, 8)
    },

    async getDeals(): Promise<Product[]> {
        const products = await HomeRepository.getDeals()
        // Products with highest discount
        return products
            .filter((p) => p.discountPercentage >= 10)
            .sort((a, b) => b.discountPercentage - a.discountPercentage)
            .slice(0, 4)
    },
}
