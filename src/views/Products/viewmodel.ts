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
    })

    const sortedProducts = computed(() =>
        ProductsService.sortProducts(products.value, filters.value.sort),
    )

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
            },
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
        products: sortedProducts,
        categories,
        total,
        loading,
        error,
        filters,
        totalPages,
        applyFilters,
        changePage,
    }
}
