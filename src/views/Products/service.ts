import { ProductsRepository } from './repository'
import type { ProductListState, SortOption } from './entity'
import type { Category, Product } from '@/types'

export const ProductsService = {
    async fetchProducts(
        search: string,
        category: string,
        limit: number,
        skip: number,
    ): Promise<ProductListState> {
        const params: Record<string, any> = { limit, skip }

        if (search.trim()) {
            params.q = search.trim()
        }

        if (category) {
            params.category = category
        }

        const res = await ProductsRepository.getProducts(params)
        return {
            products: res.products,
            total: res.total,
            skip: res.skip,
            limit: res.limit
        }
    },

    async getCategories(): Promise<Category[]> {
        return ProductsRepository.getCategories()
    },

    sortProducts(products: Product[], sort: SortOption): Product[] {
        return [...products].sort((a, b) => {
            switch (sort) {
                case 'price-asc': return a.price - b.price
                case 'price-desc': return b.price - a.price
                case 'rating': return b.rating - a.rating
                case 'discountPercentage': return b.discountPercentage - a.discountPercentage
                case 'title': return a.title.localeCompare(b.title)
                default: return 0
            }
        })
    },
}
