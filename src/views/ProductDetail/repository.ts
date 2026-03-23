import type { ProductDetail } from './entity'
import { MOCK_PASTRIES } from '@/services/mockData'

export const ProductDetailRepository = {
    async getProduct(id: string | number): Promise<ProductDetail> {
        const product = MOCK_PASTRIES.find(p => p.id === Number(id))
        if (!product) throw new Error('Product not found')

        return {
            ...product,
            reviews: [],
            dimensions: { width: 10, height: 10, depth: 10 },
            warrantyInformation: 'Freshness guaranteed for 24 hours',
            shippingInformation: 'Hand-delivered in temperature-controlled vans',
            availabilityStatus: product.stock > 0 ? 'In Stock' : 'Sold Out',
            returnPolicy: 'Non-returnable due to food safety regulations',
            minimumOrderQuantity: 1,
            images: product.images || [product.thumbnail],
            thumbnail: product.thumbnail,
        } as ProductDetail
    },
}
