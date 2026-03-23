import { useCartStore } from '@/stores/useCartStore'
import type { CartSummary } from './entity'

const SHIPPING_THRESHOLD = 50
const SHIPPING_COST = 9.99
const TAX_RATE = 0.08

export const CartService = {
    calculateSummary(
        subtotal: number,
        totalSavings: number,
    ): CartSummary {
        const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
        const tax = subtotal * TAX_RATE
        const total = subtotal + shipping + tax
        return {
            subtotal,
            discountSavings: totalSavings,
            shipping,
            tax,
            total,
        }
    },

    getShippingThreshold(): number {
        return SHIPPING_THRESHOLD
    },
}
