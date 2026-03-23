import { ProductDetailRepository } from './repository'
import type { ProductDetail } from './entity'

export const ProductDetailService = {
    async getProduct(id: number): Promise<ProductDetail> {
        return ProductDetailRepository.getProduct(id)
    },

    getDiscountedPrice(price: number, discountPercentage: number): number {
        return price * (1 - discountPercentage / 100)
    },

    getStockStatus(stock: number): { label: string; type: 'success' | 'warning' | 'danger' } {
        if (stock === 0) return { label: 'Out of Stock', type: 'danger' }
        if (stock < 5) return { label: `Only ${stock} left`, type: 'warning' }
        return { label: 'In Stock', type: 'success' }
    },
}
