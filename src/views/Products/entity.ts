import type { Product, Category, ApiPagination } from '@/types'

export type SortOption = 'rating' | 'price-asc' | 'price-desc' | 'discountPercentage' | 'title'

export interface ProductFilters {
    search: string
    category: string
    sort: SortOption
    page: number
    pageSize: number
}

export interface ProductListState extends ApiPagination {
    products: Product[]
}

export type { Product, Category }
