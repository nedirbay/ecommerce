import type { Product } from '@/types'

export interface ComboOffer {
    id: string
    title: string
    description: string
    items: Product[]
    originalPrice: number
    dealPrice: number
    image: string
    tag?: string
}

export interface SpecialDeal {
    id: string
    title: string
    subtitle: string
    discountText: string
    expiryDate?: string
    image: string
    category: string
    gradient: string
}

export interface DealsState {
    combos: ComboOffer[]
    specials: SpecialDeal[]
    loading: boolean
    error: string | null
}
