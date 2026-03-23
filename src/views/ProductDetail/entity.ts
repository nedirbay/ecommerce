import type { Product } from '@/types'

export interface ProductReview {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

export interface ProductDetail extends Product {
    reviews?: ProductReview[]
    weight?: number
    dimensions?: { width: number; height: number; depth: number }
    warrantyInformation?: string
    shippingInformation?: string
    availabilityStatus?: string
    returnPolicy?: string
    minimumOrderQuantity?: number
}

export type { Product }
