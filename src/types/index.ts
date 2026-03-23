// ─── Pagination ────────────────────────────────────────────────────────────────
export interface ApiPagination {
    total: number
    skip: number
    limit: number
}

// ─── Product ───────────────────────────────────────────────────────────────────
export interface Product {
    id: number
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand?: string
    thumbnail: string
    images: string[]
    tags: string[]
}

export interface ProductListResponse extends ApiPagination {
    products: Product[]
}

// ─── Category ─────────────────────────────────────────────────────────────────
export interface Category {
    slug: string
    name: string
    url: string
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface CartItem {
    id: number
    title: string
    price: number
    discountPercentage: number
    thumbnail: string
    quantity: number
    stock: number
}

// ─── User / Auth ───────────────────────────────────────────────────────────────
export interface User {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    image: string
    phone?: string
    address?: UserAddress
}

export interface UserAddress {
    address: string
    city: string
    state: string
    postalCode: string
    country: string
}

export interface AuthCredentials {
    username: string
    password: string
}

export interface AuthResponse extends User {
    token: string
    refreshToken: string
}

// ─── Order ─────────────────────────────────────────────────────────────────────
export interface OrderForm {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    postalCode: string
    country: string
    paymentMethod: 'card' | 'paypal' | 'cash'
}
