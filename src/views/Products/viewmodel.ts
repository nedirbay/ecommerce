import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ProductsService } from './service'
import type { ProductFilters, SortOption } from './entity'
import type { Product, Category } from '@/types'

export function useProductsViewModel() {
    const route = useRoute()
    const router = useRouter()

    const products = ref<Product[]>([])
    const categories = ref<Category[]>([])
    const total = ref(0)
    const loading = ref(true)
    const error = ref<string | null>(null)

    const filters = ref<ProductFilters>({
        search: (route.query.q as string) ?? '',
        category: (route.query.category as string) ?? '',
        sort: (route.query.sort as SortOption) ?? 'rating',
        page: Number(route.query.page ?? 1),
        pageSize: 12,
        minPrice: 0,
        maxPrice: 2000,
        rating: 0,
        onlyInStock: false,
    })

    const filteredAndSortedProducts = computed(() => {
        let result = [...products.value]

        // Frontend Filtering
        if (filters.value.minPrice > 0 || filters.value.maxPrice < 2000) {
            result = result.filter(p => p.price >= filters.value.minPrice && p.price <= filters.value.maxPrice)
        }
        if (filters.value.rating > 0) {
            result = result.filter(p => p.rating >= filters.value.rating)
        }
        if (filters.value.onlyInStock) {
            result = result.filter(p => (p.stock ?? 0) > 0)
        }

        // Sorting
        return ProductsService.sortProducts(result, filters.value.sort)
    })

    const totalPages = computed(() => Math.ceil(total.value / filters.value.pageSize))

    async function loadProducts() {
        loading.value = true
        error.value = null
        try {
            const skip = (filters.value.page - 1) * filters.value.pageSize
            const res = await ProductsService.fetchProducts(
                filters.value.search,
                filters.value.category,
                filters.value.pageSize,
                skip,
            )
            products.value = res.products
            total.value = res.total
        } catch {
            error.value = 'Failed to load products.'
        } finally {
            loading.value = false
        }
    }

    async function loadCategories() {
        try {
            categories.value = await ProductsService.getCategories()
        } catch { /* silent */ }
    }

    function applyFilters(newFilters: Partial<ProductFilters>) {
        filters.value = { ...filters.value, ...newFilters, page: 1 }
        router.replace({
            query: {
                ...(filters.value.search ? { q: filters.value.search } : {}),
                ...(filters.value.category ? { category: filters.value.category } : {}),
                ...(filters.value.sort !== 'rating' ? { sort: filters.value.sort } : {}),
                ...(filters.value.minPrice > 0 ? { minPrice: filters.value.minPrice } : {}),
                ...(filters.value.maxPrice < 2000 ? { maxPrice: filters.value.maxPrice } : {}),
                ...(filters.value.rating > 0 ? { rating: filters.value.rating } : {}),
                ...(filters.value.onlyInStock ? { onlyInStock: 'true' } : {}),
            },
        })
    }

    function resetFilters() {
        applyFilters({
            search: '',
            category: '',
            sort: 'rating',
            minPrice: 0,
            maxPrice: 2000,
            rating: 0,
            onlyInStock: false
        })
    }

    function changePage(page: number) {
        filters.value.page = page
        loadProducts()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    watch(() => filters.value, loadProducts, { deep: true })

    onMounted(() => {
        loadCategories()
        loadProducts()
    })

    return {
        products: filteredAndSortedProducts,
        categories,
        total,
        loading,
        error,
        filters,
        totalPages,
        applyFilters,
        resetFilters,
        changePage,
    }
}
