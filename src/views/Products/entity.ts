import type { Product, Category, ApiPagination } from '@/types'

export type SortOption = 'rating' | 'price-asc' | 'price-desc' | 'discountPercentage' | 'title'

export interface ProductFilters {
    search: string
    category: string
    sort: SortOption
    page: number
    pageSize: number
    minPrice: number
    maxPrice: number
    rating: number
    onlyInStock: boolean
}

export interface ProductListState extends ApiPagination {
    products: Product[]
}

export type { Product, Category }
