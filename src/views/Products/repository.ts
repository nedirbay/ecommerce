import type { Product, Category, ProductListResponse } from '@/types'
import { MOCK_PASTRIES, MOCK_CATEGORIES } from '@/services/mockData'

export const ProductsRepository = {
    async getProducts(params: Record<string, any> = {}): Promise<ProductListResponse> {
        let products = [...MOCK_PASTRIES]

        if (params.q) {
            const q = params.q.toLowerCase()
            products = products.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
        }

        if (params.category) {
            products = products.filter(p => p.category.toLowerCase().replace(' ', '-') === params.category)
        }

        const limit = params.limit || 12
        const skip = params.skip || 0
        const paginated = products.slice(skip, skip + limit)

        return {
            products: paginated,
            total: products.length,
            skip,
            limit,
        }
    },

    async getCategories(): Promise<Category[]> {
        return MOCK_CATEGORIES
    },
}
