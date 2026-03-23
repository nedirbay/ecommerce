import { computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { CartService } from './service'

export function useCartViewModel() {
    const cartStore = useCartStore()

    const summary = computed(() =>
        CartService.calculateSummary(cartStore.totalPrice, cartStore.totalSavings),
    )

    const shippingThreshold = CartService.getShippingThreshold()

    const shippingProgress = computed(() =>
        Math.min((cartStore.totalPrice / shippingThreshold) * 100, 100),
    )

    const amountToFreeShipping = computed(() =>
        Math.max(shippingThreshold - cartStore.totalPrice, 0),
    )

    return {
        items: cartStore.items,
        isEmpty: cartStore.isEmpty,
        totalItems: cartStore.totalItems,
        summary,
        shippingThreshold,
        shippingProgress,
        amountToFreeShipping,
        updateQuantity: cartStore.updateQuantity,
        removeItem: cartStore.removeItem,
        clearCart: cartStore.clearCart,
    }
}
