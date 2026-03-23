import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/useCartStore'
import { ProductDetailService } from './service'
import type { ProductDetail } from './entity'

export function useProductDetailViewModel() {
    const route = useRoute()
    const cartStore = useCartStore()

    const product = ref<ProductDetail | null>(null)
    const selectedImage = ref(0)
    const quantity = ref(1)
    const loading = ref(true)
    const error = ref<string | null>(null)

    const productId = computed(() => Number(route.params.id))

    const discountedPrice = computed(() =>
        product.value
            ? ProductDetailService.getDiscountedPrice(product.value.price, product.value.discountPercentage)
            : 0,
    )

    const stockStatus = computed(() =>
        product.value ? ProductDetailService.getStockStatus(product.value.stock) : null,
    )

    const inCart = computed(() =>
        product.value ? cartStore.isInCart(product.value.id) : false,
    )

    function addToCart() {
        if (!product.value) return
        for (let i = 0; i < quantity.value; i++) {
            cartStore.addItem({
                id: product.value.id,
                title: product.value.title,
                price: product.value.price,
                discountPercentage: product.value.discountPercentage,
                thumbnail: product.value.thumbnail,
                stock: product.value.stock,
            })
        }
    }

    async function load() {
        loading.value = true
        error.value = null
        try {
            product.value = await ProductDetailService.getProduct(productId.value)
            selectedImage.value = 0
        } catch {
            error.value = 'Product not found.'
        } finally {
            loading.value = false
        }
    }

    onMounted(load)

    return { product, selectedImage, quantity, loading, error, discountedPrice, stockStatus, inCart, addToCart }
}
