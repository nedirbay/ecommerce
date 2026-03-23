import type { OrderSummary } from './entity'
import { CartService } from '../Cart/service'
import type { CartItem } from '../Cart/entity'

export const CheckoutService = {
    buildOrderSummary(items: CartItem[], subtotal: number, totalSavings: number): OrderSummary {
        const summary = CartService.calculateSummary(subtotal, totalSavings)
        return { items, ...summary }
    },

    validateOrderForm(form: Record<string, string>): string | null {
        const required = ['firstName', 'lastName', 'email', 'address', 'city', 'country']
        for (const field of required) {
            if (!form[field]?.trim()) {
                return `Please fill in all required fields.`
            }
        }
        if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            return 'Please enter a valid email address.'
        }
        return null
    },
}
