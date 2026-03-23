import type { User, UserAddress } from '@/types'

export type { User, UserAddress }

export interface ProfileEditForm {
    firstName: string
    lastName: string
    email: string
    phone: string
}

export interface OrderHistoryItem {
    id: number
    date: string
    total: number
    status: 'delivered' | 'processing' | 'shipped' | 'cancelled'
    itemCount: number
}
