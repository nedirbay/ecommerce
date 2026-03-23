import type { CartItem } from '@/types'

// Cart page re-exports CartItem from global types
export type { CartItem }

export interface CartSummary {
    subtotal: number
    discountSavings: number
    shipping: number
    tax: number
    total: number
}
