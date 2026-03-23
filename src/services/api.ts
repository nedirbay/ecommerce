const BASE_URL = 'https://dummyjson.com'

// ─── Error ────────────────────────────────────────────────────────────────────
export class ApiError extends Error {
    constructor(
        public readonly status: number,
        message: string,
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

// ─── Core request ─────────────────────────────────────────────────────────────
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem('auth_token')

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers as Record<string, string>),
    }

    const response = await fetch(`${BASE_URL}${path}`, { ...options, headers })

    if (!response.ok) {
        throw new ApiError(response.status, `[${response.status}] ${response.statusText}`)
    }

    return response.json() as Promise<T>
}

// ─── API client ───────────────────────────────────────────────────────────────
export const api = {
    get<T>(path: string): Promise<T> {
        return request<T>(path)
    },

    post<T>(path: string, body: unknown): Promise<T> {
        return request<T>(path, { method: 'POST', body: JSON.stringify(body) })
    },

    put<T>(path: string, body: unknown): Promise<T> {
        return request<T>(path, { method: 'PUT', body: JSON.stringify(body) })
    },

    patch<T>(path: string, body: unknown): Promise<T> {
        return request<T>(path, { method: 'PATCH', body: JSON.stringify(body) })
    },

    delete<T>(path: string): Promise<T> {
        return request<T>(path, { method: 'DELETE' })
    },
}
