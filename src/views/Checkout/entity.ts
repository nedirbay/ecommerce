import type { OrderForm } from '@/types'
import type { CartItem } from '../Cart/entity'

export type { OrderForm }

export interface OrderSummary {
    items: CartItem[]
    subtotal: number
    discountSavings: number
    shipping: number
    tax: number
    total: number
}

export type PaymentMethod = 'card' | 'paypal' | 'cash'
