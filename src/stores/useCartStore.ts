import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '@/types'

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])

    // ─── Getters ───────────────────────────────────────────────────────────────
    const totalItems = computed(() =>
        items.value.reduce((sum, item) => sum + item.quantity, 0),
    )

    const totalPrice = computed(() =>
        items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
    )

    const totalSavings = computed(() =>
        items.value.reduce((sum, item) => {
            const discount = (item.price * item.discountPercentage) / 100
            return sum + discount * item.quantity
        }, 0),
    )

    const isEmpty = computed(() => items.value.length === 0)

    // ─── Actions ───────────────────────────────────────────────────────────────
    function addItem(product: Omit<CartItem, 'quantity'>) {
        const existing = items.value.find((i) => i.id === product.id)
        if (existing) {
            if (existing.quantity < existing.stock) {
                existing.quantity++
            }
        } else {
            items.value.push({ ...product, quantity: 1 })
        }
    }

    function removeItem(id: number) {
        items.value = items.value.filter((i) => i.id !== id)
    }

    function updateQuantity(id: number, quantity: number) {
        const item = items.value.find((i) => i.id === id)
        if (!item) return
        if (quantity <= 0) {
            removeItem(id)
        } else if (quantity <= item.stock) {
            item.quantity = quantity
        }
    }

    function clearCart() {
        items.value = []
    }

    function isInCart(productId: number): boolean {
        return items.value.some((i) => i.id === productId)
    }

    return {
        items,
        totalItems,
        totalPrice,
        totalSavings,
        isEmpty,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
    }
})
